# share-files · 前端学习与面试笔记

整理前端基础、框架原理、项目场景、手写题和 AI 辅助开发经验。以问题为入口，尽量用通俗的文字讲清重点，配合代码示例，方便日常学习和面试前复习。

[在线阅读](https://liyangting.github.io/share-files/) · [Demo 示例](https://liyangting.github.io/vue-examples/) · [GitHub 仓库](https://github.com/liyangting/share-files)

## 内容导航

| 方向 | 文档 | 主要内容 |
| --- | --- | --- |
| 页面与样式 | [CSS](./css.md) | 选择器优先级、Flex / Grid、响应式、图片适配、文字高亮与样式隔离 |
| 类型基础 | [TypeScript](./ts.md) | 类型扩展、泛型、联合与交叉类型、类型收窄、工具类型与运行时校验 |
| 网络与浏览器 | [网络资源](./网络资源.md) | WebSocket、SSE、跨域、预检请求、Cookie、存储、CDN 与缓存 |
| Vue | [Vue 笔记](./vue.md) | Vue 2 / 3、响应式、Composition API、nextTick 与虚拟 DOM |
| React | [React 笔记](./react.md) | Hooks、渲染流程、路由、useMemo 与 useCallback |
| 项目实践 | [场景题](./场景题.md) | 路由权限、团队协作、组件封装、大文件上传、微前端与性能优化 |
| 综合面试 | [腾讯面试](./腾讯面试.md) | 自我介绍、框架原理、工程实践、小程序与 AI 相关问答 |
| 手写练习 | [面试笔试题](./面试-笔试题.md) | 事件循环、防抖、树遍历、Promise.all、深拷贝与数组处理 |
| 小程序 | [小程序题目](./小程序.md) | 动画、虚拟列表、订阅消息、登录等题目提纲 |
| AI 开发 | [AI 辅助开发](./ai.md) | AI 工具使用、Agent、MCP / A2A / AG-UI、RAG 与聊天内容渲染 |
| 工具记录 | [Codex 购买流程](./codex购买流程.md) | 个人账号配置与订阅操作记录，包含步骤截图 |

部分 Vue、React 和小程序内容仍在补充。小程序相关的分点回答，也可以先阅读「腾讯面试」文档。工具订阅记录属于个人操作经验，可能随平台规则变化，不作为官方说明。

## 怎么使用这份笔记

1. **补基础**：先看 CSS、TypeScript、网络与浏览器，再复习自己使用的 Vue 或 React。
2. **练表达**：先看题目，尝试用一分钟回答，再对照文档补上遗漏的原理和边界条件。
3. **练代码**：笔试题先自己实现，再用空数据、重复值、异常输入等情况检查结果。
4. **结合项目**：把场景题中的思路对应到自己的真实经历，说清问题、做法和结果，不照搬未实践过的经历。

这些内容是持续维护的学习笔记，不是唯一标准答案。涉及版本差异和平台能力时，结合项目实际版本与官方文档核对。

## Demo 示例

[vue-examples](https://liyangting.github.io/vue-examples/) 是独立的示例站点，用于按文件阅读 Vue、TypeScript 代码片段，每个示例有独立页面。

当前以源码展示为主，不是在线运行沙箱。示例源码与发布流程在 [vue-examples 仓库](https://github.com/liyangting/vue-examples) 中维护，不随本仓库一起构建。

## 本地运行

本站使用 VitePress 构建，GitHub Actions 使用 Node.js 22。本地建议使用相同版本，在项目根目录执行：

```bash
npm ci
npm run docs:dev
```

打开终端输出的地址，即可预览文档。检查正式构建和预览产物：

```bash
npm run docs:build
npm run docs:preview
```

构建结果位于 `.vitepress/dist/`，无需提交生成文件或 `node_modules`。

## 项目结构

```text
.
├── README.md                 # 仓库介绍，同时作为网站首页
├── *.md                      # 各主题笔记与题目
├── assets/                   # 文档引用的图片
├── public/                   # 图标等静态文件
├── .vitepress/config.mts      # 网站信息、导航和自动目录
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
├── package.json              # 依赖与运行命令
├── package-lock.json         # 锁定依赖版本
└── DEPLOYMENT.md              # 部署说明，不生成网站文章
```

## 新增与维护内容

1. **新增文章**：在仓库根目录新建 `.md` 文件，使用清楚的文件名。左侧目录自动以文件名去掉 `.md` 后的文字显示。
2. **组织正文**：一个文档使用一个一级标题，问题使用二级标题；回答尽量用编号分点，代码放在标明语言的代码块中。
3. **更新目录**：新增、删除或重命名根目录文章后，重新构建即可更新侧边栏；本地开发服务需要重启。当前不会自动扫描子文件夹。
4. **维护首页导航**：本页的内容导航表格需要手动更新。`README.md` 作为首页，`DEPLOYMENT.md` 不进入文章目录。
5. **保存图片**：文章插图放在 `assets/` 下，通过相对路径引用，避免使用本机文件路径。
6. **提交前检查**：运行 `npm run docs:build`，确认 Markdown、内部链接和资源引用能够通过构建。

## 发布与更新

仓库的 **Settings → Pages → Source** 使用 **GitHub Actions**。推送到 `main` 后，会自动安装依赖、构建文档并部署；也可以在 Actions 中手动运行 **Deploy documentation to GitHub Pages**。

当前网站路径为 `/share-files/`。仓库改名或更换域名时，需要同步检查 `.vitepress/config.mts` 中的 `base`、图标路径和相关链接，避免页面样式加载失败。

完整步骤见仓库中的 [部署说明](https://github.com/liyangting/share-files/blob/main/DEPLOYMENT.md)。

## 纠错与补充

欢迎通过 Issue 或 Pull Request 补充内容。提交时尽量说明对应题目、修改原因、适用版本；涉及技术结论时附上官方资料或可复现示例，方便核对。
