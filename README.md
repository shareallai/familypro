# 订阅省钱研究所 (Astro + GitHub Pages)

一个以 Markdown 内容为主、SEO 优先、支持多语言（zh/en/ja 预留）的订阅内容站，主要介绍 AI 订阅与优惠订阅推荐。

## 本地运行

```bash
npm install
npm run dev
```

默认地址：`http://localhost:4321/`

## 构建

```bash
npm run build
npm run preview
```

## 当前已完成

- `Astro Content Collections` 内容模型（含 Zod schema + `locale` + `translationKey`）
- 多语言路由：`/{lang}/`、`/{lang}/blog/`、`/{lang}/blog/{slug}/`
- 已提供中英文同文文章，日语路由已预留
- SEO 组件：`title`/`description`/`canonical`/`Open Graph`/`JSON-LD`
- 多语言 SEO：`hreflang` + `x-default`
- `@astrojs/sitemap` 集成
- 静态 `robots.txt`
- GitHub Pages 自动部署工作流（`withastro/action@v5`）

## 内容目录

- 中文：`src/content/blog/zh/`
- 英文：`src/content/blog/en/`
- 日语：`src/content/blog/ja/`（按需新增）
- 数据类文章表头：直接写在文章 frontmatter `tableLabels`
- 语言注册总表：`src/lib/i18n/registry.ts`
- 各语言文案：`src/lib/i18n/locales/`

## 环境变量

```bash
cp .env.example .env
```

- `GITHUB_REPOSITORY=shareallai/familypro`
- `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`（可选，用于 GA 验证）
- `PUBLIC_GISCUS_REPO_ID=...`（必填，来自 giscus 配置页）
- `PUBLIC_GISCUS_CATEGORY=Announcements`（必填，建议公告分类）
- `PUBLIC_GISCUS_CATEGORY_ID=...`（必填，来自 giscus 配置页）

## 部署前需要修改

1. 一处配置就够：`owner/repo`（即 `GITHUB_REPOSITORY`）。
2. `site/base` 由 `astro.config.mjs` 自动推导，`robots.txt` 使用静态文件（`public/robots.txt`）。

## IndexNow（GitHub Pages 子路径站点）

这个仓库已经把 IndexNow key 文件放在（Option 2：自定义 keyLocation）：

- `public/myIndexNowKey63638.txt`

部署到 GitHub Pages 后，它会出现在：

- `https://shareallai.github.io/familypro/myIndexNowKey63638.txt`

因为站点不是用户站点根域（`https://shareallai.github.io/`），而是在 `/familypro/` 子路径下：

- 本仓库只使用 Option 2（自定义 `keyLocation`）。
- 不使用根域路径 `https://shareallai.github.io/<key>.txt`（该路径不在本仓库可控范围）。
- 提交 IndexNow 时必须显式带上 `--key-location`。

提交全站 sitemap：

```bash
python3 scripts/indexnow_submit.py \
  --key 4162e84885d4491791ae613ee30bf61b \
  --key-location https://shareallai.github.io/familypro/myIndexNowKey63638.txt
```

只提交变更页面：

```bash
python3 scripts/indexnow_submit.py \
  --key 4162e84885d4491791ae613ee30bf61b \
  --key-location https://shareallai.github.io/familypro/myIndexNowKey63638.txt \
  --url https://shareallai.github.io/familypro/zh/blog/grok-plan-guide/ \
  --url https://shareallai.github.io/familypro/en/blog/grok-plan-guide/
```

预览将要发送的 JSON：

```bash
python3 scripts/indexnow_submit.py \
  --key 4162e84885d4491791ae613ee30bf61b \
  --key-location https://shareallai.github.io/familypro/myIndexNowKey63638.txt \
  --dry-run
```

脚本默认行为：

- 未传 `--site-root` 时，会按 `GITHUB_REPOSITORY` 推导 GitHub Pages URL。
- 未传 `--url` 或 `--url-file` 时，会自动读取 `<site-root>/sitemap.xml`。
- 默认使用全局 IndexNow 端点：`https://api.indexnow.org/indexnow`。
- 会校验提交 URL 必须属于 `keyLocation` 的路径作用域。对当前仓库来说，只允许提交 `https://shareallai.github.io/familypro/` 下的 URL。

手动提交脚本（按官方示例手填参数）：

1) POST JSON（支持批量 URL，推荐）

```bash
python3 scripts/indexnow_manual_submit.py \
  --request-mode post \
  --key 4162e84885d4491791ae613ee30bf61b \
  --key-location https://shareallai.github.io/familypro/myIndexNowKey63638.txt \
  --url https://shareallai.github.io/familypro/url1 \
  --url https://shareallai.github.io/familypro/folder/url2 \
  --url https://shareallai.github.io/familypro/url3
```

2) GET Query（单 URL）

```bash
python3 scripts/indexnow_manual_submit.py \
  --request-mode get \
  --key 4162e84885d4491791ae613ee30bf61b \
  --key-location https://shareallai.github.io/familypro/myIndexNowKey63638.txt \
  --url https://shareallai.github.io/familypro/zh/blog/grok-plan-guide/
```

3) 只看请求内容，不实际发送

```bash
python3 scripts/indexnow_manual_submit.py \
  --request-mode post \
  --key 4162e84885d4491791ae613ee30bf61b \
  --key-location https://shareallai.github.io/familypro/myIndexNowKey63638.txt \
  --url https://shareallai.github.io/familypro/zh/blog/grok-plan-guide/ \
  --dry-run
```
