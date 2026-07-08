# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

纯静态个人博客，无构建工具、无后端、无数据库。使用 marked.js（CDN）在浏览器端将 Markdown 渲染为 HTML。

## 运行方式

由于使用 `fetch()` 加载本地文件，**不能**直接用 `file://` 协议打开。任选一种：

```bash
npx serve .           # Node.js 静态服务器
python -m http.server 8080   # Python 内置
```

或用 VS Code Live Server 插件打开 `index.html`。

## 架构

```
index.html          → 三栏布局骨架（顶栏 + 左侧栏 + 主内容区）
css/style.css       → 所有样式，CSS 变量集中在 :root 中
js/main.js          → 唯一 JS 文件，负责全部交互逻辑
resource/
  article-list.json → 文章索引，手动维护
  *.md              → 文章源文件
```

## 数据流

1. 页面加载 → `loadArticleList()` 请求 `resource/article-list.json`
2. 获取到文章元数据后渲染左侧栏列表（按日期倒序）
3. 用户点击文章 → `loadArticle(id)` 通过 `fetch()` 加载对应 `.md` 文件
4. 调用 `marked.parse(mdText)` 将 Markdown 转为 HTML 注入 `.markdown-body`
5. 同时更新 `window.location.hash`，支持浏览器前进/后退

## 发布文章流程

1. 在 `resource/` 下新建 `.md` 文件，写入文章内容
2. 编辑 `resource/article-list.json`，添加一条记录：

```json
{
    "id": "url-slug",        // 唯一标识，用于 URL hash
    "title": "文章标题",
    "date": "2026-07-08",
    "file": "filename.md",   // 对应的 Markdown 文件名
    "tags": ["标签1", "标签2"]
}
```

3. 刷新页面即可看到新文章

## CSS 变量体系

所有颜色和尺寸通过 `:root` 中的 CSS 自定义属性控制，修改主题时只需改这些变量：

- `--topbar-height` / `--sidebar-width` — 布局尺寸
- `--color-sidebar` / `--color-bg` / `--color-primary` — 主色调
- `--shadow-topbar` / `--shadow-card` — 阴影
- `--radius` / `--transition` — 圆角和过渡

## 关键 DOM 元素（main.js 中引用的 ID）

| ID | 用途 |
|----|------|
| `#articleList` | 左侧文章列表容器 |
| `#mainContent` | 主内容滚动容器 |
| `#welcome` | 默认欢迎页 |
| `#article` | 文章卡片容器 |
| `#articleTitle` | 文章标题 |
| `#articleMeta` | 文章元信息（日期、标签） |
| `#articleBody` | 渲染后的 Markdown 内容 |

## 技术约束

- 无构建步骤，所有依赖通过 CDN 引入
- `marked.js` 通过 `<script>` 标签从 jsdelivr CDN 加载，离线环境不可用
- 浏览器必须支持 `fetch()` 和 ES6（所有现代浏览器均满足）
- `article-list.json` 需手动维护，没有自动扫描目录的能力（浏览器端 JS 无法列出目录）
