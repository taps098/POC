import React from "react";
import {Button, Pagination, Select,Switch} from 'antd';
import styles from './HeaderPanel.module.css';
const { Option } = Select;

function HeaderPanel(props){
  const [checkStrictly, setCheckStrictly] = React.useState(false);

  let from = ((props.paginationData.page - 1) * props.paginationData.tasksPerPage) + 1,
    to = props.paginationData.page * props.paginationData.tasksPerPage;

  return(
    <ul className={styles.header}>
      <li>
        Multi Sort: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </li>
      <li>
        <Button onClick={() => props.clearAllFilters()} shape="round">Clear All Filters </Button>
      </li>
      <li>
        Results {from} - {to} of {props.total_tasks_count}
      </li>
      <li>
        Items per page &nbsp;
        <Select
          showSearch
          style={{ width: 80 }}
          defaultValue={30}
          optionFilterProp="children"
          onChange={(value)=> { props.paginate(value)}}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          size={"medium"}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
              <Option value="30">30</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>

            </Select>
      </li>
      <li className="pagination">
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={(page)=>props.chosePage(page)}
        />

        {/*<Button>1</Button>*/}

      </li>
      <li>
        <Button>Go</Button>
      </li>

    </ul>
  );
}

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

export default HeaderPanel;