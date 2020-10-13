import CombineReducer from "./reducers/CombineReducer";
import {createStore} from "redux";

const store = createStore(CombineReducer);

export default store;