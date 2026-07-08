## VS Code 高效开发配置

一个好的编辑器配置可以大幅提升开发效率。

### 推荐插件

- ESLint — 代码质量检查
- Prettier — 代码格式化
- GitLens — Git 增强
- Thunder Client — API 测试

### 自定义 Snippets

```json
{
    "Console Log": {
        "prefix": "clg",
        "body": "console.log('$1:', $1);"
    }
}
```

### 快捷键

多光标编辑 `Ctrl+Shift+L`、命令面板 `Ctrl+Shift+P` 是使用频率最高的快捷键。
