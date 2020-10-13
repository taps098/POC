import TaskReducer from "./TableReducer";
import {combineReducers} from "redux";
import {UserReducer} from "./userReducer";

const CombineReducer = combineReducers({
  taskStore : TaskReducer,
  userStore: UserReducer
})

export default CombineReducer;