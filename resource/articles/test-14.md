## RESTful API 设计规范

良好的 API 设计让前后端协作更加顺畅。

### URL 设计

- 使用名词复数：`/api/users`
- 层级关系：`/api/users/123/posts`
- 过滤和排序：`/api/users?role=admin&sort=-createdAt`

### HTTP 状态码

| 状态码 | 含义 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求错误 |
| 401 | 未认证 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

### 版本管理

推荐在 URL 中加版本号：`/api/v1/users`。
