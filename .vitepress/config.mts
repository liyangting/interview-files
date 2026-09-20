import { defineConfig } from 'vitepress'

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
      { text: '开始阅读', items: [{ text: '内容导航', link: '/' }] },
      { text: '前端基础', items: [
        { text: 'CSS', link: '/css' },
        { text: 'TypeScript', link: '/ts' },
        { text: '网络与浏览器', link: '/网络资源' }
      ] },
      { text: '框架与应用', items: [
        { text: 'Vue', link: '/vue' },
        { text: 'React', link: '/react' },
        { text: '小程序', link: '/小程序' }
      ] },
      { text: '面试实战', items: [
        { text: '业务场景题', link: '/场景题' },
        { text: '腾讯面试题', link: '/腾讯面试' }
      ] },
      { text: '开发工具', items: [
        { text: 'AI 辅助开发', link: '/ai' },
        { text: 'Codex 购买流程', link: '/codex购买流程' }
      ] }
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
