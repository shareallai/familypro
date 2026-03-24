# 订阅省钱研究所 (Astro + GitHub Pages)

一个以 Markdown 内容为主、SEO 优先、支持多语言（zh/en/ja 预留）的订阅服务博客示例站。

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

## 部署前需要修改

1. 一处配置就够：`owner/repo`（即 `GITHUB_REPOSITORY`）。
2. `site/base` 由 `astro.config.mjs` 自动推导，`robots.txt` 使用静态文件（`public/robots.txt`）。
