## 前端性能优化策略

页面加载速度直接影响用户体验和转化率。

### 资源优化

- 图片使用 WebP 格式，配合懒加载
- JS/CSS 压缩和 Tree Shaking
- 使用 CDN 加速静态资源

### 渲染优化

- 避免强制同步布局
- 使用 `requestAnimationFrame` 做动画
- 虚拟列表处理长列表

### 网络优化

- HTTP/2 多路复用
- 资源预加载：`<link rel="preload">`
- Service Worker 缓存策略
