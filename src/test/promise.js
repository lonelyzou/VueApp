
(function (window) {
  function MyPromise (excutor) {
    // 初始化属性
    const self = this  // this劫持，方便之后相关函数定义
    self.status = 'pending'  // 初始化状态
    self.data = undefined    //  用来储存将来产生了成功数据（value）或失败数据（reason）
    self.callbacks = []   // 用来存储包含处理onResolved和onRejected回调函数方法的数组

    // 定义excutor中resolve和rejected两个函数
    // 这是异步处理成功或失败后立即执行的函数
    function resolve (value) {
      // 同步修改状态和数据
      self.status = 'resolve'
      self.data = value
      // 异步调用成功的回调函数
      setTimeout(()=>{
        self.callbacks.forEach( obj => {
          obj.onResolved(value)
        })
      })
    }
    function reject (reason) {
      // 同步修改状态和数据
      self.status = 'reject'
      self.data = reason
      // 异步调用失败的回调函数
      setTimeout(()=>{
        self.callbacks.forEach( obj => {
          obj.onRejected(reason)
        })
      })
    }
    try {
      // 立即同步调用excutor()处理
      excutor(resolve, reject)
    } catch (error) {  // 如果excutor函数中抛出异常，当前promise失败
      reject(error)
    }
  }
  /*
  *  指定成功和失败后的回调函数
  *  函数返回值是一个新的promise
  * */
  MyPromise.prototype.then = function (onResolved, onRejected) {
    const self = this
    let promise2
    if(self.status === 'resolved') {  // 当前promise的状态是成功（resolved）
      promise2 = new Promise((resolve, reject) => {
        // 异步执行onResolved回调函数
        setTimeout(()=>{
          try {
            // 用x变量存储onResolved（）的返回值
            const x = onResolved(self.data)
            if(x instanceof MyPromise) { // x可能是新的promise对象
              // 先执行x这个promise，并将它的data传递能返回的promise
              x.then(resolve, reject)
            } else { // x可能是其他值
              resolve(x)
            }
          } catch (error) { // 如果过程中出了error, 交其作为返回的promise的失败reason
            reject(error)
          }
        })
      })
    } else if (self.status === 'rejected'){  // 如果当前promise的状态已经是失败(rejected)
      promise2 = new Promise((resolve, reject) => {
        // 异步执行onResolved回调函数
        setTimeout(()=>{
          try {
            // 用x变量存储onRejected（）的返回值
            const x = onRejected(self.data)
            if(x instanceof MyPromise) { // x可能是新的promise对象
              // 先执行x这个promise，并将它的data传递能返回的promise
              x.then(resolve, reject)
            } else { // x可能是其他值
              resolve(x)
            }
          } catch (error) { // 如果过程中出了error, 交其作为返回的promise的失败reason
            reject(error)
          }
        })
      })
    } else { // 如果当前promise的状态还是未确定(pending)
      promise2 = new Promise((resolve, reject) => {
        self.callbacks.push({
          onResolved(value) {
            try {
              // 用x变量存储onRejected（）的返回值
              const x = onResolved(self.data)
              if(x instanceof MyPromise) { // x可能是新的promise对象
                // 先执行x这个promise，并将它的data传递能返回的promise
                x.then(resolve, reject)
              } else { // x可能是其他值
                resolve(x)
              }
            } catch (error) { // 如果过程中出了error, 交其作为返回的promise的失败reason
              reject(error)
            }
          }
        },{
          onRejected(value) {
            try {
              // 用x变量存储onRejected（）的返回值
              const x = onRejected(self.data)
              if(x instanceof MyPromise) { // x可能是新的promise对象
                // 先执行x这个promise，并将它的data传递能返回的promise
                x.then(resolve, reject)
              } else { // x可能是其他值
                resolve(x)
              }
            } catch (error) { // 如果过程中出了error, 交其作为返回的promise的失败reason
              reject(error)
            }
          }
          })
      })
    }
    return promise2
  }
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
      if(value instanceof MyPromise) {
        // 如果传入的是promise对象, 将此promise的结果值作为返回promise的结果值
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  MyPromise.reject = function (value) {
    return new MyPromise((resolve, reject) => {
      // 将传入的参数作为返回promise的失败结果值
      reject(value)
    })
  }

  /*
 返回一个新的promise对象, 只有promises中所有promise都产生成功value时, 才最终成功, 只要有一个失败就直接失败
  */
  MyPromise.all = function (promises) {
    // 返回一个新的promise
    return new MyPromise((resolve, reject) => {
      // 已成功的数量
      let resolvedCount = 0
      // 待处理的promises数组的长度
      const promisesLength = promises.length
      // 准备一个保存成功值的数组
      const values = new Array(promisesLength)
      // 遍历每个待处理的promise
      for(let i = 0; i<promisesLength; i++) {
        // promises中元素可能不是promise对象, 需要用resolve()包装一下
        Promise.resolve(promises[i]).then(
          value => {
            // 成功当前promise成功的值到对应的下标
            values[i] = value
            // 成功的数量加1
            resolvedCount++
            // 一旦全部成功
            if(resolvedCount===promisesLength) {
              // 将所有成功值的数组作为返回promise对象的成功结果值
              resolve(values)
            }
          },
          reason => {
            // 一旦有一个promise产生了失败结果值, 将其作为返回promise对象的失败结果值
            reject(reason)
          }
        )
      }
    })
  }
  // 暴露构造函数
  window.MyPromise = MyPromise
})(window)
