## CSS Grid 布局完全指南

CSS Grid 是二维布局系统，专为解决复杂页面布局而设计。

### 基础概念

- **网格容器**：设置了 `display: grid` 的元素
- **网格项目**：容器的直接子元素
- **网格线**：构成网格的水平和垂直线

### 创建网格

```css
.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 16px;
}
```

Grid 配合 Flexbox 可以解决几乎所有布局问题。
