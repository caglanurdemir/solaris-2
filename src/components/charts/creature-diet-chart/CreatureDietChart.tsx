import 'antd/dist/antd.css';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DailyDietStats, getDietStats } from '../../../util/utilFunctions';
import { Radio } from 'antd';

export interface CreatureDietChartState {
    chartData: DailyDietStats[];
    selectedStatus: string;
}

class CreatureDietChart extends React.Component<{}, CreatureDietChartState> {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            selectedStatus: "alive"
        }
    }

    getData() {
        const { selectedStatus } = this.state;
        const calculatedData = getDietStats(selectedStatus);
        this.setState({
            chartData: calculatedData
        })
    }
    componentDidMount() {
        this.getData();
    }

    render() {
        const { chartData, selectedStatus } = this.state;
        return (
            <>
                <Radio.Group buttonStyle="solid" defaultValue={selectedStatus} onChange={(e) => {
                    this.setState({
                        selectedStatus: e.target.value
                    }, () => {
                        this.getData();
                    })
                }}>
                    <Radio.Button value="alive">Alive</Radio.Button>
                    <Radio.Button value="dead">Dead</Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
                <LineChart width={1400} height={300} data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="herbivoreCount" stroke="#8884d8" />
                    <Line type="monotone" dataKey="carnivoreCount" stroke="#82ca9d" />
                </LineChart>
            </>
        );
    }
}

export default CreatureDietChart;
