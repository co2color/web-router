import { BaseRouter } from './base.js'

export class HashRouter extends BaseRouter {
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
