import 'antd/dist/antd.css';
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
                <BarChart barSize={15} width={720} height={400} data={chartData.splice(0, 7)}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                        switch (name) {
                            case "aliveCount":
                                return [value, "Alive"]
                            case "deadCount":
                                return [value, "Dead"]
                            case "unknownCount":
                                return [value, "Unknown"]
                        }
                    }} />
                    <Bar label="Alive" dataKey="aliveCount" fill="#00a8ff" />
                    <Bar label="Dead" dataKey="deadCount" fill="#487eb0" />
                    <Bar label="Unknown" dataKey="unknownCount" fill="#7f8fa6" />
                </BarChart>
            </>
        );
    }
}

export default CreatureStatusChart;
