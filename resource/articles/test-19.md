## CI/CD 持续集成与部署

自动化流水线是现代软件开发的标准实践。

### GitHub Actions

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test
      - run: npm run build
```

### 流水线阶段

- **Lint**：代码风格检查
- **Test**：单元测试 & 集成测试
- **Build**：构建生产包
- **Deploy**：部署到服务器

自动化让团队可以频繁且安全地交付代码。
