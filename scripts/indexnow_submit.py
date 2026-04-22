#!/usr/bin/env python3
"""Submit GitHub Pages project-site URLs to IndexNow."""

from __future__ import annotations

import argparse
import json
import os
import posixpath
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Iterable, NoReturn


DEFAULT_ENDPOINT = "https://api.indexnow.org/indexnow"
DEFAULT_REPOSITORY = "shareallai/familypro"
DEFAULT_KEY_FILE_NAME = "myIndexNowKey63638.txt"
MAX_BATCH_SIZE = 10_000


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Submit updated URLs to IndexNow. Defaults are tailored for a "
            "GitHub Pages project site such as https://shareallai.github.io/familypro/."
        )
    )
    parser.add_argument(
        "--key",
        default=os.getenv("INDEXNOW_KEY"),
        help="IndexNow key. Defaults to the INDEXNOW_KEY environment variable.",
    )
    parser.add_argument(
        "--site-root",
        help=(
            "Full site root URL, for example https://shareallai.github.io/familypro. "
            "Defaults to a GitHub Pages URL inferred from GITHUB_REPOSITORY."
        ),
    )
    parser.add_argument(
        "--key-location",
        help=(
            "Full public URL of the key file. Defaults to "
            f"<site-root>/{DEFAULT_KEY_FILE_NAME} for this repo's Option 2 setup."
        ),
    )
    parser.add_argument(
        "--sitemap",
        help=(
            "Remote sitemap URL or local sitemap file path. "
            "If you do not pass --url or --url-file, the script defaults to <site-root>/sitemap.xml."
        ),
    )
    parser.add_argument(
        "--url",
        action="append",
        default=[],
        help="A full URL to submit. Repeat this flag to submit multiple URLs.",
    )
    parser.add_argument(
        "--url-file",
        type=Path,
        help="UTF-8 text file with one full URL per line. Blank lines and # comments are ignored.",
    )
    parser.add_argument(
        "--endpoint",
        default=DEFAULT_ENDPOINT,
        help=f"IndexNow endpoint. Defaults to {DEFAULT_ENDPOINT}.",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=MAX_BATCH_SIZE,
        help=f"Maximum URLs per POST request. Defaults to {MAX_BATCH_SIZE}.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the payload that would be submitted without making the HTTP request.",
    )
    return parser.parse_args()


def fail(message: str, exit_code: int = 1) -> NoReturn:
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(exit_code)


def ensure_https_url(raw_url: str, label: str) -> urllib.parse.ParseResult:
    parsed = urllib.parse.urlparse(raw_url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        fail(f"{label} must be a full http(s) URL, got: {raw_url}")
    if parsed.params or parsed.query or parsed.fragment:
        fail(f"{label} must not include params, query, or fragment: {raw_url}")
    return parsed


def normalize_url(raw_url: str) -> str:
    parsed = urllib.parse.urlparse(raw_url)
    path = parsed.path.rstrip("/")
    normalized_path = path or ""
    return urllib.parse.urlunparse((parsed.scheme, parsed.netloc, normalized_path, "", "", ""))


def join_url(base_url: str, relative_path: str) -> str:
    return urllib.parse.urljoin(f"{base_url.rstrip('/')}/", relative_path.lstrip("/"))


def derive_default_site_root(explicit_site_root: str | None) -> str:
    if explicit_site_root:
        return normalize_url(explicit_site_root)

    repository = os.getenv("GITHUB_REPOSITORY", DEFAULT_REPOSITORY)
    if "/" not in repository:
        fail(f"GITHUB_REPOSITORY must look like owner/repo, got: {repository}")

    owner, repo = repository.split("/", 1)
    site_origin = f"https://{owner}.github.io"
    if repo == f"{owner}.github.io":
        return site_origin
    return f"{site_origin}/{repo}"


def derive_key_location(site_root: str, explicit_key_location: str | None) -> str:
    if explicit_key_location:
        return explicit_key_location
    # This repo intentionally uses an Option 2 custom keyLocation file path.
    return join_url(site_root, DEFAULT_KEY_FILE_NAME)


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def read_text(source: str) -> str:
    parsed = urllib.parse.urlparse(source)
    if parsed.scheme in {"http", "https"}:
        request = urllib.request.Request(source, headers={"User-Agent": "familypro-indexnow/1.0"})
        with urllib.request.urlopen(request) as response:
            return response.read().decode("utf-8")

    path = Path(source)
    return path.read_text(encoding="utf-8")


def collect_sitemap_urls(source: str, visited: set[str] | None = None) -> list[str]:
    visited = visited or set()
    if source in visited:
        return []
    visited.add(source)

    root = ET.fromstring(read_text(source))
    root_name = local_name(root.tag)
    urls: list[str] = []

    if root_name == "urlset":
        for url_node in root:
            if local_name(url_node.tag) != "url":
                continue
            for child in url_node:
                if local_name(child.tag) == "loc" and child.text:
                    urls.append(child.text.strip())
        return urls

    if root_name == "sitemapindex":
        for sitemap_node in root:
            if local_name(sitemap_node.tag) != "sitemap":
                continue
            for child in sitemap_node:
                if local_name(child.tag) == "loc" and child.text:
                    urls.extend(collect_sitemap_urls(child.text.strip(), visited))
        return urls

    fail(f"Unsupported sitemap root element: {root.tag}")


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


def validate_scope(urls: Iterable[str], host: str, key_location: str) -> list[str]:
    key_location_parsed = ensure_https_url(key_location, "keyLocation")
    if key_location_parsed.netloc != host:
        fail(f"keyLocation host must match submitted host {host}, got: {key_location_parsed.netloc}")

    key_directory = posixpath.dirname(key_location_parsed.path or "/")
    scope_prefix = "/" if key_directory in {"", "/"} else f"{key_directory.rstrip('/')}/"

    normalized_urls: list[str] = []
    for raw_url in urls:
        parsed = urllib.parse.urlparse(raw_url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            fail(f"Each submitted URL must be a full http(s) URL, got: {raw_url}")
        if parsed.netloc != host:
            fail(f"Submitted URL host must be {host}, got: {raw_url}")

        path = parsed.path or "/"
        path_for_scope = path if path.endswith("/") else f"{path}/"
        if scope_prefix != "/" and not path_for_scope.startswith(scope_prefix):
            fail(
                "Submitted URL is outside the keyLocation scope. "
                f"keyLocation={key_location} only covers paths under {scope_prefix}, got: {raw_url}"
            )

        normalized_urls.append(urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", parsed.query, "")))

    return dedupe(normalized_urls)


def chunk(values: list[str], size: int) -> Iterable[list[str]]:
    for index in range(0, len(values), size):
        yield values[index : index + size]


def submit_batch(endpoint: str, payload: dict[str, object]) -> int:
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        endpoint,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "familypro-indexnow/1.0",
        },
    )

    try:
        with urllib.request.urlopen(request) as response:
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
    if not 1 <= args.batch_size <= MAX_BATCH_SIZE:
        fail(f"--batch-size must be between 1 and {MAX_BATCH_SIZE}.")

    site_root = derive_default_site_root(args.site_root)
    site_root_parsed = ensure_https_url(site_root, "site root")
    host = site_root_parsed.netloc
    key_location = derive_key_location(site_root, args.key_location)

    sitemap_source = args.sitemap
    input_urls: list[str] = list(args.url)
    if args.url_file:
        input_urls.extend(read_urls_from_file(args.url_file))
    if sitemap_source:
        input_urls.extend(collect_sitemap_urls(sitemap_source))
    elif not input_urls:
        input_urls.extend(collect_sitemap_urls(join_url(site_root, "sitemap.xml")))

    if not input_urls:
        fail("No URLs found. Pass --url, --url-file, or a sitemap that contains <loc> entries.")

    url_list = validate_scope(input_urls, host, key_location)

    payload_base = {
        "host": host,
        "key": args.key,
        "keyLocation": key_location,
    }

    print(f"siteRoot: {site_root}")
    print(f"host: {host}")
    print(f"keyLocation: {key_location}")
    print(f"urls: {len(url_list)}")

    if args.dry_run:
        preview_payload = dict(payload_base)
        preview_payload["urlList"] = url_list
        print(json.dumps(preview_payload, indent=2, ensure_ascii=False))
        return 0

    overall_status = 0
    for batch_number, batch_urls in enumerate(chunk(url_list, args.batch_size), start=1):
        payload = dict(payload_base)
        payload["urlList"] = batch_urls
        print(f"Submitting batch {batch_number} with {len(batch_urls)} URLs to {args.endpoint}")
        status = submit_batch(args.endpoint, payload)
        if status not in {200, 202}:
            overall_status = status
            break

    return overall_status


if __name__ == "__main__":
    raise SystemExit(main())
