## TypeScript 类型体操入门

TypeScript 的类型系统非常强大，可以实现复杂的类型推导。

### 基础泛型

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

### 条件类型

```typescript
type IsString<T> = T extends string ? true : false;
```

### 工具类型

TypeScript 内置了许多实用的工具类型：`Partial`、`Required`、`Pick`、`Omit` 等。

合理使用类型系统可以大幅提升代码质量。
