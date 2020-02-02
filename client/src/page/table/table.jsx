import React from 'react';
import Http from '../../modules/Http.class.js';
import { Table, Input, Form, Button, Popover } from 'antd'


const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.updateData(values)
    })
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: false,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }

  updateData (values) {
    let { record, handleSave } = this.props;
    Http.send({
      url: 'modify',
      method: 'patch',
      data: {
        id: record.id,
        ...values
      }
    }).success(() => {
      handleSave({ ...record, ...values });
    }).default(data => {
      this.toggleEdit();
    })
  }
}




export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.columns = [
      {
        title: '沥青路面路面损坏（PCI）汇总表（JTG 5210-2018)',
        children: [
          {
            title: '起点桩号',
            dataIndex: 'name',
            onCell: record => ({
              record,
              editable: true,
              dataIndex: 'name',
              handleSave: this.handleSave,
            })
          },
          {
            title: '车向',
            dataIndex: 'derication',
            onCell: record => ({
              record,
              editable: true,
              dataIndex: 'derication',
              handleSave: this.handleSave,
            })
          },
          {
            title: '车道号',
            dataIndex: 'number',
            onCell: record => ({
              record,
              editable: true,
              dataIndex: 'number',
              handleSave: this.handleSave,
            })
          },
          {
            title: '调查路段',
            children: [
              {
                title: '长度',
                children: [
                  {
                    title: 'm',
                    dataIndex: 'width',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'width',
                      handleSave: this.handleSave,
                    })
                  }
                ],
              },
              {
                title: '宽度',
                children: [
                  {
                    title: 'm',
                    dataIndex: 'length',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'length',
                      handleSave: this.handleSave,
                    })
                  }
                ],
              },
            ],
          },
          {
            title: '龟裂',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'alligatorCrackSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'alligatorCrackSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '中',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'alligatorCrackIntermediate',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'alligatorCrackIntermediate',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'alligatorCrackSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'alligatorCrackSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '块状裂缝',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'netShapedCrackSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'netShapedCrackSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'netShapedCrackSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'netShapedCrackSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '纵向裂缝',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'longitudinalCrackSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'longitudinalCrackSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'longitudinalCrackSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'longitudinalCrackSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '横向裂缝',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'transverseCrackSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'transverseCrackSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'transverseCrackSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'transverseCrackSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '沉陷',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'subsidenceSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'subsidenceSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'subsidenceSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'subsidenceSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '车辙',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'rutSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'rutSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'rutSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'rutSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '波浪拥包',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'wavePackSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'wavePackSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'wavePackSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'wavePackSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '坑槽',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'pitSlotSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'pitSlotSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'pitSlotSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'pitSlotSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '松散',
            children: [
              {
                title: '轻',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'looseCrackSlightly',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'looseCrackSlightly',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'looseCrackSerious',
                    onCell: record => ({
                      record,
                      editable: true,
                      dataIndex: 'looseCrackSerious',
                      handleSave: this.handleSave,
                    })
                  },
                ],
              },
            ],
          },
          {
            title: '泛油',
            children: [
              {
                title: this.setTitle,
                dataIndex: 'bleed',
                onCell: record => ({
                  record,
                  editable: true,
                  dataIndex: 'bleed',
                  handleSave: this.handleSave,
                })
              },
            ],
          },
          {
            title: '修补',
            children: [
              {
                title: this.setTitle,
                dataIndex: 'repair',
                onCell: record => ({
                  record,
                  editable: true,
                  dataIndex: 'repair',
                  handleSave: this.handleSave,
                })
              },
            ],
          },
          {
            title: 'PCI',
            children: [
              {
                title: 'DR',
                children: [
                  {
                    title: '%',
                    dataIndex: 'dr',
                  },
                ],
              },
              {
                title: 'PCI',
                children: [
                  {
                    title: '-',
                    dataIndex: 'pci',
                  },
                ],
              },
              {
                title: '等级评价',
                dataIndex: 'valuation',
                render: this.setRemoveRecord
              },
            ],
          },
        ],
      }
    ];
    this.ratio = {
      "alligatorCrackSlightly": 0.6,
      "alligatorCrackIntermediate": 0.8,
      "alligatorCrackSerious": 1,
      "netShapedCrackSlightly": 0.6,
      "netShapedCrackSerious": 0.8,
      "longitudinalCrackSlightly": 0.2 * 0.6,
      "longitudinalCrackSerious": 0.2 * 1,
      "transverseCrackSlightly": 0.2 * 0.6,
      "transverseCrackSerious": 0.2 * 1,
      "pitSlotSlightly": 0.8,
      "pitSlotSerious": 1,
      "looseCrackSlightly": 0.6,
      "looseCrackSerious": 1,
      "subsidenceSlightly": 0.6,
      "subsidenceSerious": 1,
      "rutSlightly": 0.4 * 0.6,
      "rutSerious": 0.4 * 1,
      "wavePackSlightly": 0.6,
      "wavePackSerious": 1,
      "bleed": 0.2,
      "repair": 0.1
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    let { columns } = this
    let { data } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={() => 'editable-row'}
          bordered
          size="middle"
          components={components}
        />
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>新建记录</Button>
      </div>
    )
  }

  setTitle () {
    return (
      <span>
        m<sup>2</sup>
      </span>
    )
  }

  getData() {
    Http.send({
      url: 'table',
      method: 'get',
    }).success(data => {
      data.forEach(item => {
        item = this.calculate(item)
      })
      this.setState({
        data
      })
    })
  }

  calculate (record) {
    record.key = record.id
    let ratio =  this.ratio
    let weight = 0
    for (const key in ratio) weight += record[key] * ratio[key]
    record.dr = parseFloat(100 * weight / (record.width * record.length)).toFixed(4)
    record.pci = parseInt(100 - 15 * Math.pow(record.dr, 0.412))
    if (record.pci >= 92) {
      record.valuation = '优'
    } else if (record.pci >= 80) {
      record.valuation = '良'
    } else if (record.pci >= 70) {
      record.valuation = '中'
    } else if (record.pci >= 60) {
      record.valuation = '次'
    } else {
      record.valuation = '差'
    }
    return record
  }

  handleSave = row => {
    let newData = [...this.state.data];
    let index = newData.findIndex(item => row.key === item.key);
    let item = newData[index]
    row = this.calculate(row)
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ data: newData })
  }

  handleDelete = key => {
    Http.send({
      url: 'table',
      method: 'delete',
      data: {
        id: key
      }
    }).success(() => {
      let data = [...this.state.data]
      this.setState({ data: data.filter(item => item.key !== key) })
    })
  }

  handleAdd = () => {
    let { data } = this.state;
    let newData = {
      "name": "要修改",
      "derication": "要修改",
      "number": "要修改",
    }
    Http.send({
      url: 'add',
      method: 'put',
      data: newData
    }).success(record => {
      this.setState({
        data: [...data, this.calculate(record)]
      })
    })
  }

  setRemoveRecord = (text, record, index) => {
    const content = (
      <div onClick={this.handleDelete.bind(this, record.key)}>删除</div>
    )
    return (
      <Popover placement="bottomRight" content={content} title={null} trigger="hover">{record.valuation}</Popover>
    )
  }
}
