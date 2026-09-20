# 发布到 GitHub Pages

本站使用 VitePress，将仓库中的 Markdown 自动构建为文档网站。README.md 是网站首页，原文档和图片无需搬迁。

## 首次上线

1. 将 package.json、package-lock.json、.gitignore、.vitepress/config.mts、public/favicon.svg 和 .github/workflows/deploy.yml 提交并推送到 main 分支。
2. 打开 https://github.com/liyangting/interview-files/settings/pages 。
3. 在 Build and deployment → Source 中选择 **GitHub Actions**。
4. 打开仓库 Actions，选择 Deploy documentation to GitHub Pages；如果首次运行失败，在启用 Pages 后点击 Run workflow 重新运行。
5. 工作流成功后访问 https://liyangting.github.io/interview-files/ 。

公开仓库使用 GitHub Pages 和默认域名无需购买服务器或域名。

## 本地查看

需要 Node.js 22 或更高版本。

```sh
npm ci
npm run docs:dev
```

检查正式构建：

```sh
npm run docs:build
npm run docs:preview
```

## 后续维护

- 编辑现有 Markdown 后推送到 main，网站会自动更新。
- 添加文章后，在 .vitepress/config.mts 的 sidebar 中增加对应链接。
- 本站路径为 /interview-files/；改仓库名或绑定独立域名时，需要同步修改 base 和 favicon 的路径。
- DEPLOYMENT.md 不会生成为网站文章。
