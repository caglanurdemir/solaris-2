import { Breadcrumb, Layout, Menu, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import CreatureStatusChart from '../charts/creature-status-chart/CreatureStatusChart';
import './App.css';


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

            <Row>
              <Col span={6}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, debitis voluptatum? Ab, aspernatur at officia eligendi ipsam, dolores, molestias sed suscipit debitis ratione facere explicabo modi eaque obcaecati perspiciatis optio.</Col>
              <Col span={6}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, debitis voluptatum? Ab, aspernatur at officia eligendi ipsam, dolores, molestias sed suscipit debitis ratione facere explicabo modi eaque obcaecati perspiciatis optio.</Col>
              <Col span={6}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, debitis voluptatum? Ab, aspernatur at officia eligendi ipsam, dolores, molestias sed suscipit debitis ratione facere explicabo modi eaque obcaecati perspiciatis optio.</Col>
              <Col span={6}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, debitis voluptatum? Ab, aspernatur at officia eligendi ipsam, dolores, molestias sed suscipit debitis ratione facere explicabo modi eaque obcaecati perspiciatis optio.</Col>
            </Row>
            <Row>
              <Col span={12}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum iusto ipsam dolore incidunt eius perferendis distinctio dolorum, aliquam odio in modi quis ea culpa iure placeat voluptatem vero, asperiores nesciunt!</Col>
              <Col span={12}>
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
