import {userData} from "../data/TableData";

const initialState = {
  users : userData,
}

const UserReducer = (state =initialState, action) => {
    return state;
}

export {UserReducer}