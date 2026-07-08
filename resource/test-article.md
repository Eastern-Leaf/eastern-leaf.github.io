## 这是一篇测试文章

这篇文章用于测试博客的 **Markdown 渲染效果**，涵盖了常见的排版元素。

---

### 文本样式测试

这段话包含了多种样式：**粗体文字**、*斜体文字*、~~删除线~~、`行内代码`，以及[超链接](https://example.com)。

---

### 列表测试

#### 无序列表

- Vue 3 组合式 API
- React 18 并发特性
- Tailwind CSS 工具类优先
- Node.js  streams 管道

#### 有序列表

1. 创建项目结构
2. 安装依赖
3. 编写核心逻辑
4. 编写测试用例
5. 部署上线

#### 任务列表

- [x] 完成需求分析
- [x] 搭建项目框架
- [ ] 编写单元测试
- [ ] 性能优化

---

### 引用测试

> 代码是写给人看的，顺便能在机器上运行。
> 
> — *Structure and Interpretation of Computer Programs*

多级引用：

> 第一层引用
>> 第二层引用
>>> 第三层引用

---

### 代码块测试

JavaScript：

```javascript
// 二分查找
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 输出: 2
```

Python：

```python
def fibonacci(n):
    """生成前 n 个斐波那契数"""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))
# 输出: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

### 表格测试

| 技术栈 | 用途 | 熟练度 |
|--------|------|--------|
| HTML/CSS | 页面结构与样式 | ⭐⭐⭐⭐⭐ |
| JavaScript | 交互逻辑 | ⭐⭐⭐⭐ |
| Python | 脚本与工具 | ⭐⭐⭐⭐ |
| Docker | 容器化部署 | ⭐⭐⭐ |
| SQL | 数据查询 | ⭐⭐⭐ |

---

### 图片测试

> 💡 提示：将图片放入 `resource/` 文件夹，然后在文章中引用：
> `![图片描述](image-name.png)`

---

### 分割线

上面是一段文字。

---

下面也是一段文字。

---

### 混合内容

在实际写作中，我们经常需要混合使用多种元素。比如在介绍某个概念时：

> **提示（Tip）：** 在使用 `Array.prototype.map()` 时，请确保回调函数是**纯函数**，否则可能出现意外的副作用。

配合代码示例：

```javascript
// ✅ 推荐：纯函数
const doubled = numbers.map(n => n * 2);

// ❌ 避免：有副作用
const doubled = numbers.map(n => {
    console.log(n);  // 副作用
    return n * 2;
});
```

---

### 总结

这是一篇覆盖了常用 Markdown 语法的测试文章。如果你能看到以上所有内容正常渲染，说明博客的 Markdown 解析功能运行良好！ 🎉
