## Web 安全基础防护

Web 安全是每个开发者都应关注的话题。

### XSS 防御

跨站脚本攻击是最常见的 Web 漏洞之一。防御措施包括输入验证和输出编码。

### CSRF 防护

跨站请求伪造可以通过 CSRF Token 或 SameSite Cookie 来防御。

### SQL 注入

使用参数化查询或 ORM 可以有效防止 SQL 注入：

```javascript
// ✅ 参数化查询
db.query('SELECT * FROM users WHERE id = ?', [userId]);
```

安全是一个持续的过程，需要时刻保持警惕。
