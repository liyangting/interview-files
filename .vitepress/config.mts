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
  title: '前端面试笔记',
  description: '前端面试与开发学习笔记：Vue、React、TypeScript、CSS 和业务场景。',
  base: '/interview-files/',
  rewrites: { 'README.md': 'index.md' },
  srcExclude: ['DEPLOYMENT.md'],
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/interview-files/favicon.svg' }]],
  themeConfig: {
    nav: [
      { text: '学习笔记', link: '/' },
      { text: '面试实战', link: '/腾讯面试' }
    ],
    sidebar: [
      { text: '开始阅读', items: [{ text: 'README', link: '/' }] },
      { text: '文章目录', items: articles }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/liyangting/interview-files' }],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '文章目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
