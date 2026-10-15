# 订阅省钱研究所 (Astro + GitHub Pages)

一个以 Markdown 内容为主、SEO 优先、支持多语言（zh/en/ja/de/fr/es/ru/pt）的订阅内容站，主要介绍 AI 订阅与优惠订阅推荐。

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
- 已提供中文、英文、日文、德文、法文、西班牙文、俄文、葡萄牙语文章，按 `translationKey` 关联翻译
- SEO 组件：`title`/`description`/`canonical`/`Open Graph`/`JSON-LD`
- 多语言 SEO：`hreflang` + `x-default`
- `@astrojs/sitemap` 集成
- 静态 `robots.txt`
- GitHub Pages 自动部署工作流（`withastro/action@v5`）

## 内容目录

- 中文：`src/content/blog/zh/`
- 英文：`src/content/blog/en/`
- 日语：`src/content/blog/ja/`
- 德语：`src/content/blog/de/`
- 法语：`src/content/blog/fr/`
- 西班牙语：`src/content/blog/es/`
- 俄语：`src/content/blog/ru/`
- 葡萄牙语：`src/content/blog/pt/`
- 数据类文章表头：直接写在文章 frontmatter `tableLabels`
- 语言注册总表：`src/lib/i18n/registry.ts`
- 各语言文案：`src/lib/i18n/locales/`

## Grok 内容维护

Grok 专题覆盖 `zh`、`en`、`ja`、`de`、`fr`、`es`、`ru`、`pt`，源文件位于 `src/content/blog/{locale}/`。`pt` 使用葡萄牙语文章与默认 UI 文案兜底，不要求为新增语种修改路由模板。

- `grok-plan-guide.md`：新旧套餐名称、原订阅保留与购买入口（8 个语种）。
- `xai-grok-x-subscription-plan-guide.md`：统一订阅价格、共享周额度、迁移退款与社区反应（8 个语种）。
- `grok-build-guide.md`：Build 安装、模型、命令、权限与计费（8 个语种）。
- `grok-build-commands-beginner-guide.md`：从首次任务到上下文管理、Plan、Goals 和 Workflows（中文、葡萄牙语）。

2026-10-15 已核对当前套餐、Build 文档与 API 价格。维护时分别核对 [统一订阅价格](https://docs.x.ai/x-subscription/pricing)、[Build 文档](https://docs.x.ai/build/overview)、[命令参考](https://docs.x.ai/build/modes-and-commands)和 [API / Fast 价格](https://docs.x.ai/developers/pricing)：不要把旧 SuperGrok 与新 Super 视为同一套餐，也不要把 API 费用计入订阅周额度。Grok 4.7 Fast 仅在 Cursor / Build 中提供并按所在产品套餐计费；模型 ID、客户端配置名和实际账号可用模型应分开核对。

文章修改后先运行 `npm run sync:updated-date`，再运行 `npm run check:references` 和 `npm run build`。价格核对日期与文件更新日期分别维护；翻译不能自动刷新未核实的数据日期。

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

- 该脚本会打印完整 HTTP 请求与响应（请求行、头、body、状态码、响应头、响应体）。

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
