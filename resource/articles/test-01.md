## JavaScript 异步编程详解

JavaScript 的异步编程是现代 Web 开发的核心技能之一。

### 回调函数

最早的异步处理方式，但容易导致回调地狱：

```javascript
fs.readFile('file1.txt', (err, data1) => {
    fs.readFile('file2.txt', (err, data2) => {
        fs.readFile('file3.txt', (err, data3) => {
            console.log(data1, data2, data3);
        });
    });
});
```

### Promise 链式调用

Promise 解决了回调地狱问题，让代码更加清晰。

### async/await

现代 JavaScript 中最优雅的异步处理方式。
