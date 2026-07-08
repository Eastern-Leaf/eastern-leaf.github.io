## Git 工作流最佳实践

良好的 Git 工作流是团队协作的基础。

### Git Flow

经典的分支模型，包含 master、develop、feature、release、hotfix 分支。

### Trunk-Based Development

所有开发者直接在主干上提交，通过短生命周期分支进行开发。

### 常用命令

```bash
git rebase -i HEAD~3
git cherry-pick <commit-hash>
git stash push -m "WIP"
git bisect start
```

选择适合团队规模和工作方式的工作流最重要。
