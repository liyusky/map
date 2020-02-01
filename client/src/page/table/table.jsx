import React from 'react';
import Http from '../../modules/Http.class.js';
import { Table } from 'antd';

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
          },
          {
            title: '车向',
            dataIndex: 'derication',
          },
          {
            title: '车道号',
            dataIndex: 'number',
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
                  }
                ],
              },
              {
                title: '宽度',
                children: [
                  {
                    title: 'm',
                    dataIndex: 'length',
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
                  },
                ],
              },
              {
                title: '中',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'alligatorCrackIntermediate',
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'alligatorCrackSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'netShapedCrackSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'longitudinalCrackSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'transverseCrackSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'subsidenceSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'rutSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'wavePackSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'pitSlotSerious',
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
                  },
                ],
              },
              {
                title: '重',
                children: [
                  {
                    title: this.setTitle,
                    dataIndex: 'looseCrackSerious',
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
              },
            ],
          },
          {
            title: '修补',
            children: [
              {
                title: this.setTitle,
                dataIndex: 'repair',
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
                  },
                ],
              },
              {
                title: 'PCI',
                children: [
                  {
                    title: '-',
                  },
                ],
              },
              {
                title: '等级评价',
              },
            ],
          },
        ],
      }
    ];
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    let { columns } = this
    let { data } = this.state
    return (<Table columns={columns} dataSource={data} bordered size="middle" />)
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
      this.setState({
        data
      })
    })
  }
}
