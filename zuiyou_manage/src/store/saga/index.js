import { takeEvery, takeLatest, put, apply, call } from "redux-saga/effects";
import request from "@/utils/request";

/**
 * @param {*} action
 * 我们组件进行dispath的时候会给监听，进入到saga中，匹配type，成功匹配上，那么就执行不同的函数，Case：UI组件使用react-reudx中的provider和conncet，那么就是this.props.dispatch({type:"update_user_async",userid:"15138"}),那么就会进入init中的第一个yield（因为type匹配上了），我们saga就会调用getUser函数，进行发送ajax请求拿到数据。通过put（相当于dispatch）改变store的state值，因为UI组件用了react-redux、并配置了mapStateToProps方法插入connect中，所以当我们的store的state数据发生改变的时候，我们会自动调用connect方法，把最新的store的state数据映射到我们的UI组件中
 *
 */
function* getUser(action) {
  console.log("getUser=", action); // {type:'update_user_async'}
  // const {data} = yield request.get('/user/'+action.userid);
  const { data } = yield call(request.get, "/user/" + action.userid);
  console.log("user=", data);

  // put就是dispatch
  yield put({ type: action.type.replace("_async", ""), user: data });
}

function* getNewIQ() {}

function* init() {
  // 监听用户dispatch操作
  console.log("init");
  yield takeLatest("update_user_async", getUser);
  yield takeLatest("get_newiq_async", getNewIQ);
}

export default init;
