---
title: 实现一个Web Router
excerpt: hash/history模式的router切换
date: 2023-4-17 23:45:45
tags: js
categories: 前端
---

> 话不多说，用过vue-router就知道这篇在讲什么。

前端路由主要分为hash模式和history模式。

#### hash
hash模式使用onhashchange事件监听hash值变化：
``` js
window.onhashchange = function(){
    
    // hash 值改变 
    
    // do you want
}
```

#### history
详情见(mdn)[https://developer.mozilla.org/zh-CN/docs/Web/API/History]

### 实践

首先定义BaseRouter:
``` js
class BaseRouter {
  //list = 路由列表
  constructor(list) {
    this.list = list
  }
  render(state) {
    //匹配当前的路由,匹配不到则使用404配置内容 并渲染~
    let ele = this.list.find((ele) => ele.path === state)
    ele = ele ? ele : this.list.find((ele) => ele.path === '*')
    ELEMENT.innerText = ele.component
  }
}
```
BaseRouter接收路由数组，定义render函数用来渲染对应html。

