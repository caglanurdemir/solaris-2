import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import CreatureStatusChart from '../../charts/creature-status-chart/CreatureStatusChart';

class StatsTab extends React.Component<{}, {}> {
    render() {
        return (
            <>
                <Row style={{ marginTop: "32px" }} gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <CreatureStatusChart />
                    </Col>
                </Row>
            </>
        );
    }
}

export default StatsTab;
