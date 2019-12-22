import 'antd/dist/antd.css';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { DailyStats, getDailyStats } from '../../../util/utilFunctions';

export interface CreatureStatusChartState {
    chartData: DailyStats[];
}

class CreatureStatusChart extends React.Component<{}, CreatureStatusChartState> {

    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    }

    componentDidMount() {
        const calculatedData = getDailyStats();
        this.setState({
            chartData: calculatedData
        })
    }

    render() {
        const { chartData } = this.state;
        return (
            <>
                <div className="line-chart-background">
                    <div className="radio-group">
                        <Title style={{ paddingTop: "32px" }} level={3}>Date/Status Chart</Title>
                    </div>
                    <div className="chart-centerer">
                        <BarChart barSize={15} width={1400} height={400} data={chartData} margin={{ bottom: 32 }}>
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value, name) => {
                                switch (name) {
                                    case "aliveCount":
                                        return [value, "Alive Creature Count"]
                                    case "deadCount":
                                        return [value, "Dead Creature Count"]
                                    case "unknownCount":
                                        return [value, "Unknown Creature Count"]
                                }
                            }} />
                            <Bar label="Alive" barSize={5} stackId="a" dataKey="aliveCount" fill="#778beb" />
                            <Bar label="Dead" barSize={5} stackId="a" dataKey="deadCount" fill="#f3a683" />
                            <Bar label="Unknown" barSize={5} stackId="a" dataKey="unknownCount" fill="#AFBEF9" />
                        </BarChart>
                    </div>
                </div>
            </>
        );
    }
}

export default CreatureStatusChart;
