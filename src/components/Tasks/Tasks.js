import React from 'react';
import TableTask from "../TableTask/TableTask";
import {Row, Col, Input,Select} from "antd";
import {connect} from 'react-redux';
import {PAGINATION, SELECTPAGE, CLEARALLFILTERS, SEARCH} from "../../reducers/TableReducer";
import HeaderPanel from "../HeaderPanel/HeaderPanel";
import {getTasks} from "../../selectors/TasksSelector";
const { Search } = Input;
const { Option } = Select;


class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      search_type : 'task_name',
    }
  }
  handleSearchType= (type) =>{
    this.setState({
      search_type : type,
    })
  }

  handleSearch = (query) =>{
    const payload = {
      query : query,
      type : this.state.search_type,
    }
    this.props.search(payload);
  }
  render() {

    return(
      <div>
        <Row>
          <Col span={12}>

          </Col>
          <Col span={12} style={{padding: '10px', textAlign: 'right'}}>
            <Input.Group compact>
              <Select defaultValue="task_name"
                      onChange={(value) =>{this.handleSearchType(value)}}
              >
                <Option value="task_name">Task</Option>
                <Option value="lob">LOB</Option>
              </Select>
              <Input.Search style={{ width: '40%' }}
                            onSearch={(value) =>{this.handleSearch(value)}}
                            // disabled={this.props.filter_data.searchEnabled ? false : true}
                            allowClear

                            placeholder="input search text"  enterButton />
            </Input.Group>

          </Col>
        </Row>
        <Row className='navbar'>
          <Col span={24}>
            <HeaderPanel
              paginate = {this.props.pagination}
              chosePage = {this.props.chosePage}
              paginationData = {this.props.pagination_data}
              total_tasks_count = {this.props.total_tasks_count}
              clearAllFilters = {this.props.clearAllFilters}
            />
          </Col>
        </Row>

        <Row className='navbar'>
          <Col span={24}>
            <TableTask
              user_data={this.props.users}
              data={this.props.tasks}
              // users = this.props.

            />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps= (store) => {
  return {
    pagination_data: store.taskStore.pagination,
    total_tasks_count: store.taskStore.tasks.length,
    tasks: getTasks(store.taskStore),
    users: store.userStore.users,
    filter_data : store.taskStore.filter,
  }
}
const mapDispatchToProps = (dispatch) =>{
    return {
      pagination : (value) => {dispatch({type: PAGINATION , payload : value})},
      chosePage : (page) => {dispatch({type : SELECTPAGE, payload : page} )},
      clearAllFilters : () => {dispatch({type : CLEARALLFILTERS})},
      search : (payload) => {dispatch({type : SEARCH, payload: payload})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);