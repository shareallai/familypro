#!/usr/bin/env python3
"""Manually submit URLs to IndexNow (Option 2 keyLocation)."""

from __future__ import annotations

import argparse
import json
import os
import posixpath
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Iterable, NoReturn


DEFAULT_ENDPOINT = "https://api.indexnow.org/indexnow"
DEFAULT_HOST = "shareallai.github.io"
DEFAULT_KEY_LOCATION = "https://shareallai.github.io/familypro/myIndexNowKey63638.txt"
DEFAULT_TIMEOUT_SECONDS = 20


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Manual IndexNow submission script. Uses Option 2 keyLocation by default "
            f"({DEFAULT_KEY_LOCATION})."
        )
    )
    parser.add_argument(
        "--request-mode",
        choices=["post", "get"],
        default="post",
        help=(
            "Request style. post sends JSON payload with urlList, "
            "get sends one URL with query params (url/key/keyLocation)."
        ),
    )
    parser.add_argument(
        "--endpoint",
        default=DEFAULT_ENDPOINT,
        help=f"IndexNow endpoint. Defaults to {DEFAULT_ENDPOINT}.",
    )
    parser.add_argument(
        "--host",
        default=DEFAULT_HOST,
        help=f"Submitted host value. Defaults to {DEFAULT_HOST}.",
    )
    parser.add_argument(
        "--key",
        default=os.getenv("INDEXNOW_KEY"),
        help="IndexNow key. Defaults to INDEXNOW_KEY environment variable.",
    )
    parser.add_argument(
        "--key-location",
        default=DEFAULT_KEY_LOCATION,
        help=(
            "Public key file URL. Defaults to this repo's Option 2 URL: "
            f"{DEFAULT_KEY_LOCATION}."
        ),
    )
    parser.add_argument(
        "--url",
        action="append",
        default=[],
        help="A full URL to submit. Repeat this flag to add multiple URLs.",
    )
    parser.add_argument(
        "--url-file",
        type=Path,
        help="UTF-8 text file with one full URL per line. Blank lines and # comments are ignored.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=DEFAULT_TIMEOUT_SECONDS,
        help=f"HTTP timeout in seconds. Defaults to {DEFAULT_TIMEOUT_SECONDS}.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print request details without sending to IndexNow.",
    )
    return parser.parse_args()


def fail(message: str, exit_code: int = 1) -> NoReturn:
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(exit_code)


def ensure_http_url(raw_url: str, label: str) -> urllib.parse.ParseResult:
    parsed = urllib.parse.urlparse(raw_url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        fail(f"{label} must be a full http(s) URL, got: {raw_url}")
    return parsed


def read_urls_from_file(path: Path) -> list[str]:
    urls: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        candidate = line.strip()
        if not candidate or candidate.startswith("#"):
            continue
        urls.append(candidate)
    return urls


def dedupe(values: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    ordered: list[str] = []
    for value in values:
        if value in seen:
            continue
        seen.add(value)
        ordered.append(value)
    return ordered


def validate_scope(urls: list[str], host: str, key_location: str) -> list[str]:
    key_location_parsed = ensure_http_url(key_location, "keyLocation")
    if key_location_parsed.netloc != host:
        fail(f"keyLocation host must match --host ({host}), got: {key_location_parsed.netloc}")

    key_directory = posixpath.dirname(key_location_parsed.path or "/")
    scope_prefix = "/" if key_directory in {"", "/"} else f"{key_directory.rstrip('/')}/"

    normalized_urls: list[str] = []
    for raw_url in urls:
        parsed = ensure_http_url(raw_url, "submitted URL")
        if parsed.netloc != host:
            fail(f"Submitted URL host must be {host}, got: {raw_url}")

        path = parsed.path or "/"
        path_for_scope = path if path.endswith("/") else f"{path}/"
        if scope_prefix != "/" and not path_for_scope.startswith(scope_prefix):
            fail(
                "Submitted URL is outside keyLocation scope. "
                f"keyLocation={key_location} only covers {scope_prefix}, got: {raw_url}"
            )

        normalized_urls.append(
            urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", parsed.query, ""))
        )

    return dedupe(normalized_urls)


def collect_urls(args: argparse.Namespace) -> list[str]:
    urls = list(args.url)
    if args.url_file:
        urls.extend(read_urls_from_file(args.url_file))
    if not urls:
        fail("No URL provided. Pass at least one --url or --url-file.")
    return urls


def submit_post(
    endpoint: str,
    host: str,
    key: str,
    key_location: str,
    urls: list[str],
    timeout: int,
) -> int:
    payload = {
        "host": host,
        "key": key,
        "keyLocation": key_location,
        "urlList": urls,
    }
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        endpoint,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "familypro-indexnow-manual/1.0",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read().decode("utf-8", errors="replace").strip()
            print(f"IndexNow response: HTTP {response.status}")
            if body:
                print(body)
            return response.status
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace").strip()
        print(f"IndexNow response: HTTP {exc.code}", file=sys.stderr)
        if body:
            print(body, file=sys.stderr)
        return exc.code


def submit_get(endpoint: str, key: str, key_location: str, url: str, timeout: int) -> int:
    query = urllib.parse.urlencode(
        {
            "url": url,
            "key": key,
            "keyLocation": key_location,
        }
    )
    endpoint_with_query = f"{endpoint}?{query}"
    request = urllib.request.Request(
        endpoint_with_query,
        method="GET",
        headers={
            "User-Agent": "familypro-indexnow-manual/1.0",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read().decode("utf-8", errors="replace").strip()
            print(f"IndexNow response: HTTP {response.status}")
            if body:
                print(body)
            return response.status
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace").strip()
        print(f"IndexNow response: HTTP {exc.code}", file=sys.stderr)
        if body:
            print(body, file=sys.stderr)
        return exc.code


def main() -> int:
    args = parse_args()

    if not args.key:
        fail("Missing --key and INDEXNOW_KEY is not set.")
    if args.timeout <= 0:
        fail("--timeout must be greater than 0.")

    urls = validate_scope(collect_urls(args), args.host, args.key_location)

    if args.request_mode == "get" and len(urls) != 1:
        fail("GET mode supports exactly one URL. Use --request-mode post for multiple URLs.")

    print(f"endpoint: {args.endpoint}")
    print(f"requestMode: {args.request_mode}")
    print(f"host: {args.host}")
    print(f"keyLocation: {args.key_location}")
    print(f"urls: {len(urls)}")

    if args.dry_run:
        if args.request_mode == "post":
            preview_payload = {
                "host": args.host,
                "key": args.key,
                "keyLocation": args.key_location,
                "urlList": urls,
            }
            print(json.dumps(preview_payload, indent=2, ensure_ascii=False))
        else:
            query = urllib.parse.urlencode(
                {
                    "url": urls[0],
                    "key": args.key,
                    "keyLocation": args.key_location,
                }
            )
            print(f"{args.endpoint}?{query}")
        return 0

    if args.request_mode == "post":
        status = submit_post(args.endpoint, args.host, args.key, args.key_location, urls, args.timeout)
    else:
        status = submit_get(args.endpoint, args.key, args.key_location, urls[0], args.timeout)

    return 0 if status in {200, 202} else status


if __name__ == "__main__":
    raise SystemExit(main())
