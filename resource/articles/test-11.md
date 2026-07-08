## Node.js Stream 深入理解

Stream 是 Node.js 的核心概念之一，用于高效处理数据流。

### 四种 Stream 类型

- **Readable**：可读流，如 `fs.createReadStream()`
- **Writable**：可写流，如 `fs.createWriteStream()`
- **Duplex**：双工流，如 `net.Socket`
- **Transform**：转换流，如 `zlib.createGzip()`

### 管道模式

```javascript
fs.createReadStream('input.txt')
    .pipe(transformStream)
    .pipe(fs.createWriteStream('output.txt'));
```

Stream 能有效控制内存使用，适合处理大文件。
