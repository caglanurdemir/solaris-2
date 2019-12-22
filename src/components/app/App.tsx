import * as FontAwesomeIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, notification, Select, Tabs } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React from 'react';
import { DateSelectOption, getDateOptions, getSelectedDaysCounts, SelectedDaysCounts } from '../../util/utilFunctions';
import DailyTab from '../tabs/dailyTab/DailyTab';
import StatsTab from '../tabs/statsTab/StatsTab';
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

  openNotification = (placement, type) => {
    const { selectedDate } = this.state;
    notification[type]({
      message: `Fetched data successfully`,
      description:
        `You are succesfully viewing the data for ${moment(selectedDate).format("DD.MM.YYYY")}. If you're not seeing any difference on the data, then you should try another date from select options. Because we haven't heard any news from our implants for a very a long time. Watch out for details.`,
      placement,
      duration: 6
    });
  };

  render() {
    const { selectedDate, dateOptions } = this.state;
    const cardStats: SelectedDaysCounts = getSelectedDaysCounts(selectedDate);
    return (
      <>
        <Layout>
          <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            Solaris 2 - Çağla Nur Demir
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px', marginTop: 96 }}>
            <Tabs
              tabBarExtraContent={
                this.state.currentTab === "0" ? <div style={{
                  float: "right",
                  padding: "0px 0px 16px 0px"
                }} className="extra-content">
                  {"You are viewing datas from: "}
                  <Select defaultValue={selectedDate} style={{ width: 120 }} onChange={(value) => {
                    this.setState({
                      selectedDate: value
                    }, () => {
                      this.openNotification("bottomRight", "success");
                    })
                  }}>
                    {dateOptions.map((dateOptionsObject: DateSelectOption) => {
                      return <Select.Option value={dateOptionsObject.date}>{dateOptionsObject.parsedDate}</Select.Option>
                    })}
                  </Select>
                </div> : <></>}
              size="large"
              defaultActiveKey="0"
              onChange={(activeKey) => {
                this.setState({
                  currentTab: activeKey
                })
              }}>
              <Tabs.TabPane
                tab={
                  <>
                    <FontAwesomeIcon style={{ marginRight: "8px" }} icon={FontAwesomeIcons.faCalendarDay} /> Daily View
                  </>
                }
                key="0">
                <DailyTab selectedDate={selectedDate} cardStats={cardStats} />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <>
                    <FontAwesomeIcon style={{ marginRight: "8px" }} icon={FontAwesomeIcons.faChartPie} /> Stats
                  </>
                }
                key="1">
                <StatsTab />
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>
        </Layout>
      </>
    );
  }
}

export default App;
