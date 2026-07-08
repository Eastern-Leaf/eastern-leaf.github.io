## Docker 容器化实战

Docker 让应用的打包、分发和运行变得简单。

### Dockerfile 编写

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose

多容器应用的管理工具，通过 YAML 文件定义服务。

### 常用命令速查

- `docker build -t myapp .`
- `docker-compose up -d`
- `docker logs -f container_name`
