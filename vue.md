### 1. vue2和vue3的区别
 - 响应式原理的不同
    - vue2: 使用的是object.defineProperty。无法检测对象属性的添加或删除；无法监控数组的下标变化。需要$set去手动更新
    - vue3: 使用的是ES6的proxy。可以直接监听对象和数组的变化，性能更好。支持动态的添加或删除属性
 - 组合式API和选项式API
    - vue2: 用的是选项式(optionsAPI)，代码按照data、computed、watch、methods的顺序写的，比较分散。逻辑比较复杂时，代码太碎片化了，不好复用。依赖this指向，this指向的是实例
    - vue3: 用的是组合式(compositionAPI),引入setUp语法糖。可以将同一功能的逻辑，一些状态和方法写在一起，便于复用。没有this,直接通过变量访问，更纯粹
- 生命周期：
    - vue2: 创建实例时，会执行created和mounted，在数据发生改变时，会执行updated和mounted。
    - vue3: 
        - 移除了beforecreate和created， 合并成setup函数.setup在组件实例初始化时就会执行，可以直接在这里进行数据初始化和接口请求
        - 挂载前后和更新前后，都加了on前缀
        - 销毁前后的两个钩子：beforeDestroy和destroyed 更改为onBeforeUnmount和onUnmounted，为了语义更准确，表示卸载，而不是销毁
        - 如果在vue3中同时使用了选项式和组合式，生命周期的执行顺序应该是什么样的？
            1、setup
            2、beforeCreate和created 
            3、onBeforeMount / beforeMount
            4、onMounted / mounted
            5、onBeforeUpdate / beforeUpdate
            6、onUpdated / updated
            7、onBeforeUnmount / beforeDestroy
            8、onUnmounted / destroyed
            原则：compositionAPI的同名钩子通常比opptionsAPI的钩子执行早，会先执行。除了setup,本身就是最早的

- 性能提升：
    - vue2: 由于使用的是object.defineProperty，性能比较低。在处理大量数据时，性能会受到影响。即使没有用到，所有的选项也会被打包进去，导致体积增加。
    - vue3: 使用的是ES6的proxy，性能更好。支持Tree Shaking(摇树优化)，未使用的模块不会被打包进去。
### 2. vue3的hooks模式
- 概念：自定义组合式函数。利用compositionAPI，将一些常用的功能封装成hooks函数，方便复用,以use开头
- hooks和minxs的区别：
    1. hooks是显式导入，变量来源清晰 --- minxs是隐式混入，变量来源不清晰
    2. hooks没有名称冲突，每个hooks返回独立的变量，互不干扰 --- 多个mixin有同名变量时会覆盖，不好排查
    3. hooks支持ts，可以自动推断返回值类型  --- minxs不支持ts
    4. hooks每次调用都是创建新的实例(闭包原理)，状态完全隔离 --- 容易共享状态，产生bug,排查困难
    5. 组件A和组件B调用同一个hooks时，都会创建一个新的执行上下文，其中ref也是新创建的，所以拿到的是两份不同的内存引用，互不干扰

### 3. vue3 中的 nextTick？
- 概念：nextTick是一个异步更新队列。
- 作用：vue的dom是异步更新的，修改数据后dom不会立刻变化，而是进入一个异步队列等待批量更新，在下次DOM更新完成之后，执行延迟回调。
- 使用场景：
    修改了数据，想立即获取更新后的dom元素。 因为dom更新是异步的，直接获取的话还是旧的dom元素。
    ```
    data.value = 'new value'; 
    nextTick(() => {
        console.log('dom更新完成');
    })
    ```
- 原理：基于es6的promise(微任务)实现，
- 快速记忆：数据变化 -> dom异步更新 -> 想获取新的dom元素 -> 调用nextTick    

### 4. compositionAPI 和 optionsAPI的区别？
- options api 太分散了，依赖this, mixin有命名冲突问题
- composition api更简单，没有this，hooks没有命名冲突问题,返回的都是独立的变量，互不干扰

### 5. vue3中的ref 和 reactive的区别？
- 接受的数据类型不同：
    - ref: 通吃。可以定义基本类型，也可以定义对象。
    - reactive: 只能定义对象或者数组。如果定义一个基本类型，它不会变成响应式的。
- 原理：
    - ref: 如果是基本数据类型，通过object.defineProperty的getter和setter进行劫持，如果是对象，它内部其实还是调用了reactive
    - reactive: 直接用的proxy代理，能监听动态的删减
- 使用场景：
    - ref: 在js代码中读写要加```.value```;但是html模板中vue会自动解包，不用加。
    - reactive: 无论是在js还是html中，都是当普通对象使用，不用加````.value```
```js
const state = reactive({
    count: 0
})
state = {count: 1} // ❌ 错误做法，直接替换了整个对象，变量指向变成了新的内存地址，vue监听不到这个变化，断开了proxy代理

state.count = 1 // ✅ 正确做法，修改属性值，会触发响应式更新
// 或者 使用Object.assign()
Object.assign(state, {count: 1}) 

```
### 6. vue3中的computed 和 watch的区别？
- computed: 计算属性，就是为了计算出一个新值。比如说根据两个字段的变化，计算出一个新的值，所以必须有返回值。如果依赖的数据发生变化，会重新计算，返回计算的新结果，否则直接返回旧值。内部只能是同步的，不能有异步操作，否则会导致死循环。
- watch: 监听属性。是为了观察某个数据的变化再做某件事。支持异步，比如说id变化时去发起一个网络请求。没有返回值，重点是执行副作用。没有缓存，数据一变化就会执行。
### 7. watch和watchEffect的区别？
- watch: 监听属性，当属性变化时，执行回调函数
- watchEffect: 监听属性，当属性变化时，执行回调函数。但是回调函数是同步的，不能有异步操作。
### 8. 虚拟Dom的理解？
