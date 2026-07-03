### react router的 basename 和 server baseUrl（publicPath） 的区别？
### react中usememo和usecallback的区别？可以代码中全部使用吗？
### 怎么在useMemo中拿到最新的state？
### react怎么通过路由参数通信？
### 说说你对reacthook的理解
Hook是React 16.8.0版本增加的新特性/新语法，可以让你在函数组件!中使用state以及其他的React特性
常见Hook:
- 1、useState:管理组件状态,返回[state,setState]数组。执行机制:在组件渲染时执行。
- 2、useEffect:处理副作用(如请求、订阅等)，替代生命周期方法。执行机制:组件渲染后异步执行。
     第二个参数可以是[，表示只执行一次，也可以传参，传参之后只要:当我们的数据发生变化时才会触发，
     如果不写，那么发生一次变化就会执行一次依赖变化时重新计算
- 3、useMemo:数据缓存，缓存计算结果，避免重复计算。执行机制:依赖变化时重新计算
- 4、useCallback:缓存函数，避免子组件不必要重渲染。执行机制:依赖变化时重新创建函数
- 5、useRef:保存可变值，直接访问DOM元素，不会触发组件的更新。执行机制:持久化保存值
- 6、useLayoutEffect:布局效果，DOM更新后、浏览器绘制前同步丸行。执行机制:DOM更新后同步执行

***

### 父子组件hook的渲染顺序

问题: 比如说父组件中有useState、useRef、useLayoutEffect、useEffect,子组件中有useState、useRef、useLayoutEffect、useEffect,说说他们的渲染顺序。

正确执行顺序: 父useState -> 父useRef -> 子useState子useRef -> 子useLayoutEffect -> 父useLayoutEffect -> 子useEffect -> 父useEffect。
关键要点:
- 1.React会先完成整个组件树的render阶段(包括所有子组件)
- 2.然后才执行 useLayoutEffect(从子到父)
- 3.最后执行 useEffect(同样从子到父)



### 说说你对React的渲染流程的理解

触发渲染:组件首次挂载或state/props更新时触发重新渲染。
调用render方法:组件的render 方法会被调用，返回新的虚拟DOM。
- 1、虚拟 DOM的diff算法:React 会比较当前虚拟 DOM和上一次渲染的虚拟 DOM，找出差异。
- 2、DOM更新:React 会根据diff结果，更新真实DOM 上的差异部分。
- 3、浏览器绘制:浏览器会根据更新后的DOM 进行重新绘制。

***
### useCallback、useMemo的区别
useCallback 和 useMemo 都是 React Hooks 提供的用于优化性能的 Hook。它们都是用于缓存函数或计算结果的。
- 1、useCallback:缓存函数本身，避免子组件不必要重渲染。执行机制:依赖变化时重新创建函数
     - 作用：缓存函数本身
     - 语法：const memoizedFn = useCallback(fn, deps)
     - 原理：返回一个记忆化的回调函数。只有当依赖项 deps 中的某个值发生变化时，才会重新创建这个函数；否则在多次渲染中始终使用同一个函数引用。
     - 适用场景：
          - 将函数作为 props 传递给子组件（特别是经过 React.memo 优化的子组件），避免因父组件重新渲染导致子组件不必要的重绘。
          - 函数的依赖项较少且相对稳定时，保证函数引用的稳定。
- 2、useMemo:数据缓存，缓存计算结果，避免重复计算。执行机制:依赖变化时重新计算
     - 作用：缓存计算结果（即函数的返回值）。
     - 语法：const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
     - 原理：调用传入的函数并返回其结果。只有当依赖项 deps 变化时，才会重新计算该值；否则直接返回上一次缓存的值。
     - 适用场景：
          - 有昂贵的计算（如大量数据遍历、复杂表达式）时，避免每次渲染都重复计算。
          - 计算结果依赖于多个状态或 props，且这些依赖项变化时才需要重新计算。
useCallback 和 useMemo 的主要区别在于它们缓存的是函数或计算结果。
