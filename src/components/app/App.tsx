import { Breadcrumb, Col, Layout, Menu, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import Card from '../card/Card';
import CreatureStatusChart from '../charts/creature-status-chart/CreatureStatusChart';
import './App.css';
import { getLastSyncTime, getLastDaysCounts } from '../../util/utilFunctions';


class App extends React.Component {
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
              <Menu.Item key="1">Dashboard</Menu.Item>
            </Menu>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Solaris 2</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={16}>
              <Card className="gutter-row" iconBackgroundColor="#778beb" iconName="faCalendarAlt" title={getLastSyncTime()} subtitle="Last update time" />
              <Card className="gutter-row" iconBackgroundColor="#ea8685" iconName="faHeart" title={getLastDaysCounts().aliveCount.toString()} subtitle="Alive Creatures" />
              <Card className="gutter-row" iconBackgroundColor="#596275" iconName="faDizzy" title={getLastDaysCounts().deadCount.toString()} subtitle="Dead Creatures" />
              <Card className="gutter-row" iconBackgroundColor="#f7d794" iconName="faQuestion" title={getLastDaysCounts().unknownCount.toString()} subtitle="Unknown Creatures" />
            </Row>
            <Row style={{ marginTop: "32px" }} gutter={16}>
              <Col className="gutter-row" span={12}>
              </Col>
              <Col className="gutter-row" span={12}>
                <CreatureStatusChart />
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </>
    );
  }
}

export default App;
