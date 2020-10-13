import {produce} from 'immer';

const getTasks = (task_store) => {
  // debugger
  let page = task_store.pagination.page || 1,
    per_page = task_store.pagination.tasksPerPage || 30,
    offset = (page - 1) * per_page;
  console.log("OFFSET", offset, "per page", per_page);
  let query = task_store.filter.query,
    type = task_store.filter.type;
  return produce(task_store, (draft) => {
    let tasks = draft.tasks;
    if (typeof query !== "undefined" && query !== ''){
      tasks = tasks.filter(item =>{
        return item[type].toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    }
    draft.tasks = tasks.splice(offset, per_page)
  }).tasks;

}
export {getTasks};

