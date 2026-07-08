## React 状态管理方案对比

React 生态中有多种状态管理方案，各有优劣。

### useState + useContext

适合小型应用，无需额外依赖。

### Redux Toolkit

Redux 官方推荐的工具集，简化了传统 Redux 的样板代码。

### Zustand

轻量级状态管理库，API 简洁直观：

```javascript
const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

选择方案时需考虑项目规模和团队经验。
