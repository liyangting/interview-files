import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Scan article files at build/startup time; README remains the home page.
const root = fileURLToPath(new URL('../', import.meta.url))
const articles = readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith('.md')
    && !['README.md', 'DEPLOYMENT.md'].includes(entry.name))
  .map(entry => entry.name.slice(0, -3))
  .sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true }))
  .map(name => ({ text: name, link: `/${encodeURIComponent(name)}` }))

export default defineConfig({
  lang: 'zh-CN',
  title: 'share-files',
  description: '前端面试与开发学习笔记：Vue、React、TypeScript、CSS 和业务场景。',
  base: '/share-files/',
  rewrites: { 'README.md': 'index.md' },
  srcExclude: ['DEPLOYMENT.md'],
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/share-files/favicon.ico' }]],
  themeConfig: {
    nav: [
  { text: '面试', link: '/' },
  {
    text: 'demo示例',
    link: 'https://liyangting.github.io/vue-examples/',
    target: '_blank'
  },
  {
    text: 'file',
    link: 'https://github.com/liyangting/你的file仓库名',
    target: '_blank'
  }
],
    sidebar: [
      { text: '文章目录', items: articles }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/liyangting/share-files' }],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '文章目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
