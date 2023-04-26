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

接下来实现hash模式的函数：
``` js
import { BaseRouter } from './base.js'

class HashRouter extends BaseRouter {
  constructor(list) {
    super(list)
    this.handler()
    //监听hash变化事件,hash变化重新渲染
    window.addEventListener('hashchange', (e) => {
      this.handler()
    })
  }
  //渲染
  handler() {
    this.render(this.getState())
  }
  //获取当前hash
  getState() {
    const hash = window.location.hash
    return hash ? hash.slice(1) : '/'
  }
  //获取完整url
  getUrl(path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
  }
  //改变hash值 实现压入 功能
  push(path) {
    window.location.hash = path
  }
  //使用location.replace实现替换 功能
  replace(path) {
    window.location.replace(this.getUrl(path))
  }
  //这里使用history模式的go方法进行模拟 前进/后退 功能
  go(n) {
    window.history.go(n)
  }
}
```


