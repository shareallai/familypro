# AGENT.md

## 1) Mission
你是本仓库（Astro 多语言内容站）的执行型工程 agent。目标是：
- 在不破坏路由、SEO、部署的前提下完成内容与页面迭代。
- 优先保证可构建、可部署、可抓取、可索引。

## 2) Repo Truth Sources
改动前先对齐以下文件：
- 内容 schema：`src/content.config.ts`
- 内容目录（主事实源）：`src/content/blog/**`
- 语种与 SEO 辅助函数：`src/lib/i18n.ts`
- 已知语种文案（可选扩展）：`src/lib/i18n/registry.ts`、`src/lib/i18n/locales/**`
- 页面模板层：`src/pages/**`、`src/layouts/**`、`src/components/SEO.astro`
- 部署配置：`astro.config.mjs`、`.github/workflows/deploy.yml`
- 项目说明：`README.md`

## 3) Global Constraints & Scope
- Node 版本必须满足 `>=22.12.0`。
- 不修改构建产物或缓存目录：`dist/`、`.astro/`。
- 不破坏既有路由形态：`/{lang}/`、`/{lang}/blog/`、`/{lang}/blog/{slug}/`。
- 不硬编码 GitHub Pages repo 路径，遵循 `GITHUB_REPOSITORY` 推导。
- frontmatter 必须符合 `blog` collection schema。
- 渲染模式必须保持“服务端输出 HTML”（当前为 Astro 静态预渲染，build-time SSR）。禁止把核心内容改成纯客户端渲染。
- 默认策略：新增文章、重写文章、新增语种翻译时，只改 `src/content/blog/**`。
- `src/pages/**` 与 `src/lib/i18n/locales/**` 视为模板/框架层，非必要不改。
- 仅在以下情况允许改模板层：站点级 SEO 规则升级、全站信息架构/布局变更、schema 或渲染机制发生结构性调整。
- 禁止为单篇文章或单语种做 page 级 hardcode。

## 4) Content Model Constraints
- `locale` 必须与目录一致（如 `src/content/blog/zh/**` -> `locale: zh`）。
- `locale` 使用小写字母/数字与可选连字符（如 `en`、`zh`、`ja`、`pt-br`）。
- 同一篇跨语言内容必须共用 `translationKey`。
- `headline` 为可选字段；若提供，则作为页面可见 `h1`，而 `title` 继续用于 HTML `<title>`、OG/Twitter 等 SEO 标题。
- 公开文章必须 `draft: false`。
- 日期字段必须明确：`pubDate`；更新事实信息时同步 `updatedDate`。
- 涉及价格/汇率的内容必须标注“数据日期 + 仅供参考”。
- `service` 仅允许 schema 白名单值。
- 新增语种时，若不改 `locales/registry`，系统会使用默认 UI 文案兜底；这是允许的。

## 5) Writing & Structure Requirements
- 当用户要求输出多语言博客内容时，默认顺序为：先中文版本，再其他语言版本。
- 中文版本必须写成适合中文读者的自然表达；其他语言版本同样禁止逐句直译，应按目标语言做意译和本地化表达。
- 各语言版本必须保持事实、结论、产品信息、SEO 主关键词与 CTA 一致；允许在句式、例子、段落节奏上做本地化调整。
- 禁止明显 AI 腔：避免空话套话、机械排比、过度整齐的段落结构、重复性总结、夸张但无信息量的形容。
- 文章页默认应尽量形成清晰的 `h1 -> h2 -> h3` 层级，但不能为了凑层级机械拆分；必须先构思文章结构、论述顺序和段落推进，再决定哪些内容是 `h2`、哪些需要下沉为 `h3`。
- 模板层输出唯一 `h1`；Markdown 正文从 `h2` 开始，避免在正文里再写额外的 `#` 标题。
- 只有当某个 `h2` 下确实存在并列的子问题、子步骤、子判断或子维度时，才使用 `h3`；若该节本质上是一段连续展开，就保持 `h2 + 正文`。
- 教程、指南、步骤型文章的章节标题允许加序号；若使用编号，同层级标题应保持一致，且编号应跟随真实结构走。

## 6) SEO Baseline
- 每个可索引 URL 必须有唯一 `title` 和 `description`。
- 对文章页，`title` 与可见 `h1` 应保持高语义重叠与核心关键词一致；默认优先“核心词一致、写法略区分”。
- 若使用 `headline`，应让 `title` 更偏搜索结果表达，`headline` 更偏页面阅读体验；两者都必须准确概括内容，且不得互相矛盾。
- 文章正文中的站外链接默认必须输出 `rel="nofollow"`；若作者使用原生 HTML `<a>`，也必须保持该属性。
- `title` 长度建议：
  - 中文页：20-32 个汉字（硬上限 40 汉字）。
  - 英文/日文页：45-65 个字符（硬上限 70 字符）。
- `description` 长度建议：
  - 中文页：60-90 个汉字（硬上限 110 汉字）。
  - 英文/日文页：120-160 个字符（硬上限 180 字符）。
- 每个可索引页必须有且仅有 1 个绝对 URL canonical，且自指向当前语言页面。
- 首页/列表页 `hreflang` 基于站内已发布语种；文章页 `hreflang` 基于同一 `translationKey` 的可用翻译语种；都必须包含 `x-default`。
- 文章详情页必须输出完整的 OG/Twitter 元信息，且 `og:url` 必须等于 canonical。
- 文章页必须保持 `Article` JSON-LD，至少包含 `headline`、`description`、`datePublished`、`dateModified`、`inLanguage`、`author`、`mainEntityOfPage`。
- 每页仅一个 `h1`；标题层级按 `h1 -> h2 -> h3` 合理递进，不跳级滥用。
- 非装饰性图片必须有可读 `alt` 文本。
- `robots.txt` 和 `sitemap-index.xml` 必须可访问；不得引入明显内部死链。

## 7) Skill Usage
- 仓库内博客工作流文档的 source of truth 位于 `.ai/skills/familypro-blog-workflow/`。
- 当任务属于博客创建、重写、扩写、翻译、本地化、事实刷新、SEO 调整、frontmatter 调整或博客 review 时，优先遵循 `.ai/skills/familypro-blog-workflow/` 中的工作流说明。
- 不依赖 `~/.codex/skills`、软链接或其他本机私有安装；工作流配置默认随代码走。
- `AGENT.md` 负责仓库级硬约束；具体博客工作流、review 流程、创建流程、翻译流程与检查顺序由 skill 承载。

## 8) Validation
- 默认验证命令：`npm run build`。
- 若改了页面渲染或样式：`npm run preview` 并人工抽查关键页面。
- 若改了 SEO 逻辑或 `title` / `headline` / `description` / hreflang / canonical：检查页面源码中的 meta/link/json-ld 输出。
- 提交前至少抽查：首页、一个文章列表页、一个文章详情页（含非默认语言至少 1 页）。

## 9) Done Definition
仅当以下全部满足才算完成：
- 构建通过（`npm run build`）。
- schema 与 i18n 规则满足。
- SEO 无明显回归。
- 最终汇报包含：修改文件、变更原因、验证步骤、剩余风险。

## 10) Forbidden Actions
- 不提交密钥或修改 `.env` 真实凭据。
- 不引入任务无关的大规模格式化。
- 不在无必要时改动部署工作流。
- 不擅自变更默认语言或 URL 策略。
- 不为单语种新增去修改 `src/pages/**` 路由模板（除非属于全站级规则变更）。

## 11) Response Contract
agent 最终回复使用固定结构：
1. 结果结论（1-2 句）
2. 修改文件清单
3. 验证命令与结果
4. 风险/后续建议（如有）
