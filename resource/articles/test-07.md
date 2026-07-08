## Linux 常用命令整理

日常开发中离不开 Linux 命令行的使用。

### 文件操作

```bash
find . -name "*.js" -type f
grep -r "TODO" src/
awk '{print $1}' access.log
sed 's/foo/bar/g' file.txt
```

### 系统监控

```bash
htop
df -h
du -sh *
lsof -i :3000
```

### 网络工具

```bash
curl -X POST -H "Content-Type: application/json" -d '{}' url
netstat -tlnp
ss -tlnp
```
