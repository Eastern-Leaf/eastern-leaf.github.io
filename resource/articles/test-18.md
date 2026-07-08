## 数据结构：链表与数组

理解数据结构有助于写出更高效的代码。

### 数组

连续内存空间，随机访问 O(1)，插入删除 O(n)。

### 链表

非连续内存，通过指针连接，插入删除 O(1)，访问 O(n)。

### JavaScript 实现

```javascript
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}
```

选择合适的数据结构是算法设计的第一步。
