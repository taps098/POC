import React ,{useState}from 'react';
import {Table,Select} from 'antd';
import Label from "../../common/Label";
import ProgressBar from "../../common/ProgressBar";
import moment from "moment";
import {SettingFilled} from '@ant-design/icons';
const { Option } = Select;



class TableTask extends React.Component{
  constructor(props) {
    super(props);
  }

  resolveLobColor = (value) => {
    switch (value.toLowerCase()) {
      case 'medicare', 'medical':
        return '#71399A';
      case 'commercial':
        return '#FDAC59';
      case 'exchange':
        return '#FF3B00';
      case 'medicaid':
        return '#FF838A';
      case 'finance':
        return '#00CF7F'
      default:
        return 'grey';
    }
  }

  resolveStatusColor = (value) => {
    switch(value.toLowerCase()){
      case 'pending':
        return '#636e72';
      case 'in review':
        return '#fdcb6e';
      case 'in progress':
        return '#0984e3';
      case 'completed':
        return '#00b894'
    }
  }


  render() {

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id > b.id,
        sortDirections: ['ascend', 'descend'],
        width: '60px',
        fixed: 'left',
      },
      {
        title: 'TASK NAME',
        dataIndex: 'task_name',
        render: text => <a>{text}</a>,
        sorter: (a, b) => a.task_name.localeCompare(b.task_name),
        sortDirections: ['descend', 'ascend'],
        fixed: 'left',
      },
      {
        title: 'LOB',
        dataIndex: 'lob',
        sorter: (a, b) => a.lob.length - b.lob.length,
        sortDirections: ['descend', 'ascend'],
        render: value => (
            <Label text={value} color={this.resolveLobColor(value)} />
        )
      },
      {
        title: 'SUBTASKS ',
        dataIndex: 'sub_task_count',
        sorter: (a, b) => a.sub_task_count - b.sub_task_count,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'ASSIGN TO ',
        dataIndex: 'assigned_to',
        sorter: (a, b) => a.assign_to - b.assign_to,
        sortDirections: ['descend', 'ascend'],
        render : assigned_to => {
          return(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              defaultValue={assigned_to}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >

              {this.props.user_data.map((item) => {
                return(
                  <Option value={item.id}>{item.first_name + item.last_name}</Option>
                )
              })}

            </Select>
          );
        }
      },
      {
        title: 'STEP ',
        dataIndex: 'status',
        sorter: (a, b) => a.status - b.status,
        sortDirections: ['descend', 'ascend'],
        render: value => (
          <Label text={value} color={this.resolveStatusColor(value)} />
        )
      },
      {
        title: 'DUE DATE ',
        dataIndex: 'due_date',
        sorter: (a, b) => a.due_date - b.due_date,
        sortDirections: ['descend', 'ascend'],
        width: '260px',
        render: (value) => {
          let date = moment(value),
            diff = date.diff(moment(new Date), 'days'),
            progress;

          if(diff > 10) {
            progress = 20;
          } else if (diff > 5 && diff <= 10) {
            progress = 50;
          } else if (diff > 1 && diff <= 5){
            progress = 90;
          } else {
            progress = 100;
          }

          return (
            <ProgressBar value={progress} text={date.format("MM/DD/YYYY @ hh:mm A")} />
          )
        }
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    

    return(
      <div>
        <Table
          rowSelection={{
             ...rowSelection
          }}
          bordered
          rowKey='id'
          columns={columns}
          dataSource={this.props.data}
          pagination = {false}
          scroll={{ x: 1500 }} sticky
        />
      </div>
    );
  }
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

export default TableTask;