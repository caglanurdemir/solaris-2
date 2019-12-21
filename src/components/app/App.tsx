import * as FontAwesomeIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Layout, Menu, Row, Select, Spin, Table, Tabs, Tag } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { capitalize, getLastDaysCounts, getLastSyncTime, getTableDataByDate } from '../../util/utilFunctions';
import Card from '../card/Card';
import CreatureStatusChart from '../charts/creature-status-chart/CreatureStatusChart';
import './App.css';

interface AppState {
  currentTab: string;
}

const columns = [
  {
    title: "Implant Code",
    dataIndex: "id",
    key: "id",
    align: "center" as const
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "center" as const,
    render: (age) => capitalize(age),
    filters: [
      {
        text: 'Young',
        value: 'young',
      },
      {
        text: 'Adult',
        value: 'adult',
      }
    ],
    onFilter: (value, record) => record.age.indexOf(value) === 0
  },
  {
    title: "Diet",
    dataIndex: "diet",
    key: "diet",
    align: "center" as const,
    render: (diet) => capitalize(diet),
    filters: [
      {
        text: 'Herbivore',
        value: 'herbivore',
      },
      {
        text: 'Carnivore',
        value: 'carnivore',
      }
    ],
    onFilter: (value, record) => record.diet.indexOf(value) === 0
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center" as const,
    render: (status: string) => {
      switch (status) {
        case "alive":
          return <Tag color="#ea8685" style={{ width: "80%" }}>
            <FontAwesomeIcon icon={FontAwesomeIcons.faHeart} /> Alive
            </Tag>;
        case "dead":
          return <Tag color="#596275" style={{ width: "80%" }}>
            <FontAwesomeIcon icon={FontAwesomeIcons.faDizzy} /> Dead
            </Tag>;
        case "unknown":
          return <Tag color="#f7d794" style={{ width: "80%" }}>
            <FontAwesomeIcon icon={FontAwesomeIcons.faQuestion} /> Unknown
            </Tag>;
      }
    },
    filters: [
      {
        text: 'Alive',
        value: 'alive',
      },
      {
        text: 'Dead',
        value: 'dead',
      },
      {
        text: 'Unknown',
        value: 'unknown',
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0
  },
  {
    title: "Taxonomy",
    dataIndex: "taxonomy",
    key: "taxonomy",
    align: "center" as const,
    render: (columnData: string[]) => {
      return <span>
        {
          columnData.map((t) => {
            return <Tag>{capitalize(t)}</Tag>;
          })
        }
      </span>
    }
  }
];

class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "0"
    }
  }

  render() {
    return (
      <>
        <Layout>
          <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              {this.state.currentTab === "0" && (
                <Select defaultValue="jack" style={{ width: 120 }} onChange={(value) => {
                  console.log(value)
                }}>
                  <Select.Option value="jack">28.08.2015</Select.Option>
                </Select>
              )}

            </Menu>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Tabs size="large" defaultActiveKey="0" onChange={(activeKey) => {
              this.setState({
                currentTab: activeKey
              })
            }}>
              <Tabs.TabPane tab="Daily View" key="0">
                <Row gutter={16}>
                  <Card className="gutter-row" iconBackgroundColor="#778beb" iconName="faCalendarAlt" title={getLastSyncTime()} subtitle="Last sync time" />
                  <Card className="gutter-row" iconBackgroundColor="#ea8685" iconName="faHeart" title={getLastDaysCounts().aliveCount.toString()} subtitle="Alive Creatures" />
                  <Card className="gutter-row" iconBackgroundColor="#596275" iconName="faDizzy" title={getLastDaysCounts().deadCount.toString()} subtitle="Dead Creatures" />
                  <Card className="gutter-row" iconBackgroundColor="#f7d794" iconName="faQuestion" title={getLastDaysCounts().unknownCount.toString()} subtitle="Unknown Creatures" />
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Table bordered={true} size="middle" style={{ marginTop: "32px" }} dataSource={getTableDataByDate()} columns={columns} />
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Stats" key="1">
                <Row style={{ marginTop: "32px" }} gutter={16}>
                  <Col className="gutter-row" span={12}>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <CreatureStatusChart />
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>

          </Layout.Content>
        </Layout>
      </>
    );
  }
}

export default App;
