---
title: 实现一个Web Router
excerpt: hash/history模式的router切换
date: 2023-4-17 23:45:45
tags: js
categories: 前端
---

> 话不多说，用过 vue-router 就知道这篇在讲什么。

前端路由主要分为 hash 模式和 history 模式。

#### hash

hash 模式使用 onhashchange 事件监听 hash 值变化：

```js
window.onhashchange = function () {
  // hash 值改变
  // do you want
}
```

#### history

详情见(mdn)[https://developer.mozilla.org/zh-CN/docs/Web/API/History]

### 实践

首先定义 BaseRouter:

```js
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

BaseRouter 接收路由数组，定义 render 函数用来渲染对应 html。

有了 base，我们就来挨个实现 hash 和 history。
不管是 hash 还是 history，我们都要实现同样的几个方法：hander、getState、getUrl、push、replace、go

接下来先实现 hash 模式的函数：

```js
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

然后是 historyRender：

```js
import { BaseRouter } from './base.js'

export class HistoryRouter extends BaseRouter {
  constructor(list) {
    super(list)
    this.handler()
    //监听历史栈信息变化,变化时重新渲染
    window.addEventListener('popstate', (e) => {
      this.handler()
    })
  }
  //渲染
  handler() {
    this.render(this.getState())
  }
  //获取路由路径
  getState() {
    const path = window.location.pathname
    return path ? path : '/'
  }
  //使用pushState方法实现压入功能
  //PushState不会触发popstate事件,所以需要手动调用渲染函数
  push(path) {
    history.pushState(null, null, path)
    this.handler()
  }
  //使用replaceState实现替换功能
  //replaceState不会触发popstate事件,所以需要手动调用渲染函数
  replace(path) {
    history.replaceState(null, null, path)
    this.handler()
  }
  go(n) {
    window.history.go(n)
  }
}
```
