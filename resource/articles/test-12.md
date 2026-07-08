## SQL 查询优化技巧

数据库查询优化是后端开发的必修课。

### 索引优化

合理使用索引是查询优化的第一步。注意索引的最左前缀原则。

### 查询改写

避免 `SELECT *`，只查需要的字段。用 `EXPLAIN` 分析执行计划。

### 常见误区

- 在 WHERE 子句中对字段使用函数，导致索引失效
- 大表 JOIN 没有合适的索引
- N+1 查询问题

```sql
EXPLAIN SELECT id, name FROM users WHERE status = 'active';
```
