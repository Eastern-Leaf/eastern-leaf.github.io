## 设计模式在 JavaScript 中的应用

设计模式是解决常见编程问题的经典方案。

### 观察者模式

```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        (this.events[event] ||= []).push(listener);
    }
    emit(event, ...args) {
        this.events[event]?.forEach(fn => fn(...args));
    }
}
```

### 单例模式

确保一个类只有一个实例，常用于全局状态管理。

### 策略模式

将算法封装成独立的策略类，让它们可以互相替换。
