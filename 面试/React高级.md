* 在显示时，将内容写入__html对象中即可
  <div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }} />

## 1、setState
1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
2. 如果需要获取“异步”场景的 setState 的值  --> this.setState(partial, callback) 在callback中拿到最新的值
3. 如果要在“异步”场景更新多次 setState --> this.setState((prevState, props) => {return newState})

## 2、Fragment
* before
  * 代码

    ```
    export default class App extends Component {
      render() {
        return (
          <div>
            <h2>App组件</h2>
            <p>这是App组件的内容</p>
          </div>
        );
      }
    }
    ```
  * 效果
    ![img](https://user-gold-cdn.xitu.io/2019/3/29/169c9e8de3e3b296?w=245&h=124&f=png&s=6360)
* after
  * 代码
  
    ```
    export default class App extends Component {
      render() {
        return (
          <Fragment>
            <h2>App组件</h2>
            <p>这是App组件的内容</p>
          </Fragment>
        );
      }
    }
    ```  
  * 效果
  ![img](https://user-gold-cdn.xitu.io/2019/3/29/169c9e91ba1812b5?w=232&h=82&f=png&s=5274)
    
* 总结：使用 Fragment ，可以不用添加额外的DOM节点  

## 3、React性能优化
* shouldComponentUpdate

	```
	shouleComponentUpdate(nextProps, nextState) {
		return true; // 更新
		return false; // 不更新
	}
	```
* PureComponent组件
	```
	// 以下就是 PureComponent 浅比较源码
	// 实现 Object.is() 方法, 判断x y是否完全相等
	function is(x, y) {
	  // (x !== 0 || 1 / x === 1 / y) 用于判断 0 和 -0 不相等
	  // x !== x && y !== y	 用于判断 NaN 等于 NaN
	  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y
	  ;
	}
	
	// 提取了hasOwnProperty方法，缓存
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	
	// 返回false为更新，true为不更新
	function shallowEqual(objA, objB) {
	  // 如果A和B完全相等，返回true
	  if (is(objA, objB)) {
	    return true;
	  }
	  // 如果A和B不相等，并且不是对象，说明就是普通值，返回false
	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }
	  // 提取A和B的所有属性
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	  // 如果长度不相等，返回false
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	  
	  // 检测 A 的属性 和 B 的属性是否一样
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }
	  
	  return true;
	}
	```
* 问题：如果使用pureComponent只能进行浅比较，如果修改了原数据再更新，就会导致地址值一样从而不会更新。但实际需要更新。
* 解决：
	* 保证每次都是新的值
	* 使用 immutable-js 库，这个库保证生成的值都是唯一的
		```
		var map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
		var map2 = map1.set('b', 50);
		map1.get('b'); // 2
		map2.get('b'); // 50
		```
* 总结：使用以上方式，可以减少不必要的重复渲染。

## 4、React高阶组件
https://juejin.im/post/5c972f985188252d7f2a3eb0

## 5、render props
https://react.docschina.org/docs/render-props.html

## 6、React懒加载
* react-loadable
	```
	import Loadable from 'react-loadable';
	import Loading from './components/loading'
	
	const LoadableComponent = Loadable({
	  loader: () => import('./components/home'),
	  loading: Loading,
	});
	
	export default class App extends Component {
	  render() {
	    return (
	      <div>
	        <h2>App组件</h2>
	        <LoadableComponent />
	      </div>
	    );
	  }
	}
	```
* Suspense 和 lazy
	```
	import React, {Component, Suspense, lazy} from 'react';
	import Loading from './components/loading';
	
	const LazyComponent = lazy(() => import('./components/home'));
	
	export default class App extends Component {
	  render() {
	    return (
	      <div>
	        <h2>App组件</h2>
	        <Suspense fallback={<Loading />}>
	          <LazyComponent />
	        </Suspense>
	      </div>
	    );
	  }
	}
	```
* 区别
	* `react-loadable` 是民间 --> 需要额外下载引入  
	* `Suspense` 和 `lazy` 是官方 --> 只需引入
	* `react-loadable` 支持服务器渲染   
	* `Suspense` 和 `lazy` 不支持服务器渲染 
* 总结：使用 create-react-app 会将其单独提取成一个bundle输出，从而资源可以懒加载和重复利用。

## 7、虚拟DOM diff算法
* 虚拟DOM diff算法主要就是对以下三种场景进行优化：
* tree diff
  * 对树进行分层比较，两棵树只会对同一层次的节点进行比较。(因为 DOM 节点跨层级的移动操作少到可以忽略不计)
  * 如果父节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。
  * 注意：
    * React 官方建议不要进行 DOM 节点跨层级的操作，非常影响 React 性能。
    * 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点。
* component diff
  * 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree（tree diff）。
    * 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。
  * 如果不是，直接替换整个组件下的所有子节点。
* element diff
  * 对处于同一层级的节点进行对比。
  * 这时 React 建议：添加唯一 key 进行区分。虽然只是小小的改动，性能上却发生了翻天覆地的变化！
    * 如： A B C D  -->  B A D C
    * 添加 key 之前： 发现 B != A，则创建并插入 B 至新集合，删除老集合 A；以此类推，创建并插入 A、D 和 C，删除 B、C 和 D。
    * 添加 key 之后： B、D 不做任何操作，A、C 进行移动操作，即可。
  * 建议：在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

* 总结
  * React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
  * React 通过分层求异的策略，对 tree diff 进行算法优化；
  * React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
  * React 通过设置唯一 key的策略，对 element diff 进行算法优化；
  * 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
  * 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。  
    
> [原文链接](https://zhuanlan.zhihu.com/p/20346379)

## 8、React fiber调度算法
