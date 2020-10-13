import {data} from "../data/TableData";
import {castDraft, produce} from 'immer';

const initialState = {
  pagination : {
    page : 1,
    tasksPerPage : 30,
  },
  filter : {
    type: 'task_name',
    query: '',
    // searchEnabled: false
  },
  tasks : data,
}

export const PAGINATION = 'PAGINATION';
export const  SELECTPAGE ='SELECTPAGE';
export const CLEARALLFILTERS = 'CLEARALLFILTERS';
export const SEARCH = 'SEARCH';

const TaskReducer = (state=initialState, action) => {
    switch (action.type){
      case PAGINATION:
        return produce(state, (draft)=>{
          draft.pagination.tasksPerPage = action.payload;
        })
      case SELECTPAGE:
        //debugger;
        return produce(state, (draft)=>{
          draft.pagination.page = action.payload;
        })
      case CLEARALLFILTERS:
        debugger;
        return produce(state, (draft)=>{
          draft.pagination.page = 1;
          draft.pagination.tasksPerPage = 30;
        })
      case SEARCH:
      // action = {
      //   type: "SEARCH",
      //   payload: {
      //     type: "task_name",
      //     query: "fjksl"
      //   }
      // }
        return produce(state,(draft)=>{

          // draft.filter.searchEnabled = true;
              draft.filter.query = action.payload.query;
              draft.filter.type = action.payload.type;
        })
      default:
        return state;
    }
}

export default TaskReducer;