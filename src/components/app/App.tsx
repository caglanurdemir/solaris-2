import { Col, Layout, Menu, Row, Select, Tabs } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { DateSelectOption, getDateOptions, getLastDaysCounts, getLastSyncTime } from '../../util/utilFunctions';
import Card from '../card/Card';
import CreatureStatusChart from '../charts/creature-status-chart/CreatureStatusChart';
import DailyTable from '../tables/dailyTable/DailyTable';
import './App.css';

interface AppState {
  currentTab: string;
  dateOptions: DateSelectOption[];
  selectedDate: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "0",
      dateOptions: [],
      selectedDate: ""
    }
  }

  componentWillMount() {
    const dateOptions: DateSelectOption[] = getDateOptions();
    this.setState({
      dateOptions: dateOptions,
      selectedDate: dateOptions[0].date
    })
  }

  render() {
    const { selectedDate, dateOptions } = this.state;
    return (
      <>
        <Layout>
          <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
            </Menu>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Tabs size="large" defaultActiveKey="0" onChange={(activeKey) => {
              this.setState({
                currentTab: activeKey
              })
            }}>
              <Tabs.TabPane tab="Daily View" key="0">
                <Row>
                  <div style={{
                    float: "right",
                    padding: "0px 0px 16px 0px"
                  }}>
                    {"You are viewing datas from this selected date: "}
                    <Select defaultValue={selectedDate} style={{ width: 120 }} onChange={(value) => {
                      this.setState({
                        selectedDate: value
                      })
                    }}>
                      {dateOptions.map((dateOptionsObject: DateSelectOption) => {
                        return <Select.Option value={dateOptionsObject.date}>{dateOptionsObject.parsedDate}</Select.Option>
                      })}
                    </Select>
                  </div>
                </Row>
                <Row gutter={16}>
                  <Card className="gutter-row" iconBackgroundColor="#778beb" iconName="faCalendarAlt" title={getLastSyncTime()} subtitle="Last sync time" />
                  <Card className="gutter-row" iconBackgroundColor="#ea8685" iconName="faHeart" title={getLastDaysCounts().aliveCount.toString()} subtitle="Alive Creatures" />
                  <Card className="gutter-row" iconBackgroundColor="#596275" iconName="faDizzy" title={getLastDaysCounts().deadCount.toString()} subtitle="Dead Creatures" />
                  <Card className="gutter-row" iconBackgroundColor="#f7d794" iconName="faQuestion" title={getLastDaysCounts().unknownCount.toString()} subtitle="Unknown Creatures" />
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <DailyTable selectedDate={selectedDate} />
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
