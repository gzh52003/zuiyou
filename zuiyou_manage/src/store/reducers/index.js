// 这个文件用于把reducers文件夹中的所有rendcer进行合并
import { combineReducers } from "redux";
// 引进common文件中的reducer方法，并命名为commonReducer
import commonReducer from "./common";
import userReducer from "./user";
import managetype from "./managetype";

//使用combinReducers进行合并reducer
const reducer = combineReducers({
  common: commonReducer,
  user: userReducer,
  managetype: managetype,
});

export default reducer;
