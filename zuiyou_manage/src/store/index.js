// redux 的用法就像context状态提升一样
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import mysaga from "./saga";
// const initState = {
//   currenUser: {},
// };

// // reducer必须为“纯函数”
// const reducer = function (state = initState, action) {
//   switch (action.type) {
//     case "login":
//       return {
//         ...state,
//         currenUser: {},
//       };

//     case "logout":
//       return {
//         ...state,
//         currrenUser: {},
//       };

//     default:
//       return state;
//   }
// };
// 1、引入saga
import createSagaMiddleware from "redux-saga";
// 2: 创建saga中间件
const sagaMiddleware = createSagaMiddleware();
// 3：把saga中间件与store进行结合
let enhancer = applyMiddleware(sagaMiddleware);
// 4：合并两个中间件，这个composeWithDevTools()是允许浏览器查看redux数据的插件配置
// case1: enhancer = composeWithDevTools(enhancer);
// case2:
enhancer = compose(enhancer, composeWithDevTools());
// 创建store仓库
const store = createStore(reducer, enhancer);

// 运行saga配置
sagaMiddleware.run(mysaga);

// 导出
export default store;

/***
 * 为什么要使用redux？
 * 我们的组件有些时候数据（状态）需要公用
 * 为什么组件中要使用react-redux？
 * 因为react-redux是连接我们react和redux的工具，里面有connect和provider。
 * Provider，类似我们的context。把store输出到子组件中去
 * connect(mapStateToProps,mapDispatchPorps),如果你在UI组件中使用connect。
 * mapStateToProps可以把store的state映射到我们的UI组件的props，并且会实时监测我们store的state数据变化，如果状态改变，那么store的state数据会重新映射到我们的UI组件中去
 * mapDispatchPorps把Redux修改store数据的dispatch方法映射到我们的UI组件的props中去
 * /


/* 组件如何使用这个仓库
// 在main或者其他组件中引入store/index.js
    然后和context差不多，只要<provider store={store}>包着的组件A</provider>
    组件A、组件A内的所有组件都可以使用
    //获取：store.getState()
    //修改：store.dispatch(action) 只有你action的参数，符合上面reducer函数的case才能够进去
    //监听：store.subscribe(fn)

    如果UI组件用了React-Redux、connect、provider
    修改：props.dispatch(action)   前提PS: connect()
    获取：props.xxx属性   前提PS: connect(mapStateToProps)
    */
