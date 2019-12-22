import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import CreatureStatusChart from '../../charts/creature-status-chart/CreatureStatusChart';
import CreatureDietChart from '../../charts/creature-diet-chart/CreatureDietChart';

class StatsTab extends React.Component<{}, {}> {
    render() {
        return (
            <>
                <Row style={{ marginTop: "32px" }} gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <CreatureDietChart />
                    </Col>
                </Row>
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
