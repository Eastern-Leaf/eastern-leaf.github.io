## Nginx 配置指南

Nginx 是高性能的 HTTP 和反向代理服务器。

### 静态网站托管

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;
}
```

### 反向代理

```nginx
location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_set_header Host $host;
}
```

### HTTPS 配置

使用 Let's Encrypt 免费证书，配合 Certbot 自动续期。
