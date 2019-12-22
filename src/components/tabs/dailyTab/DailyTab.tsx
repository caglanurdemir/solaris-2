import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React from 'react';
import { SelectedDaysCounts } from '../../../util/utilFunctions';
import Card from '../../card/Card';
import DailyTable from '../../tables/dailyTable/DailyTable';

interface DailyTabProps {
    cardStats: SelectedDaysCounts;
    selectedDate: string;
}

class DailyTab extends React.Component<DailyTabProps, {}> {
    render() {

        const { selectedDate, cardStats } = this.props;
        return (
            <>

                <Row gutter={16}>
                    <Card className="gutter-row" iconBackgroundColor="#778beb" iconName="faCalendarAlt" title={moment(selectedDate).format("DD.MM.YYYY")} subtitle="Selected sync time" />
                    <Card className="gutter-row" iconBackgroundColor="#ea8685" iconName="faHeart" title={cardStats.aliveCount.toString()} subtitle="Alive Creatures" />
                    <Card className="gutter-row" iconBackgroundColor="#596275" iconName="faDizzy" title={cardStats.deadCount.toString()} subtitle="Dead Creatures" />
                    <Card className="gutter-row" iconBackgroundColor="#f7d794" iconName="faQuestion" title={cardStats.unknownCount.toString()} subtitle="Unknown Creatures" />
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <div className="table-background">
                            <DailyTable selectedDate={selectedDate} />
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default DailyTab;
