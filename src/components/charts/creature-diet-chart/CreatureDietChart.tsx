import { Radio } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { DailyDietStats, getDietStats, capitalize } from '../../../util/utilFunctions';
import Title from 'antd/lib/typography/Title';

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
                <div className="line-chart-background">
                    <div className="radio-group">
                        <Title style={{ paddingTop: "32px" }} level={3}>Diet/Status Chart</Title>
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
                    </div>
                    <div className="chart-centerer">
                        <LineChart width={1400} height={400} data={chartData} margin={{ bottom: 32 }}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value, name) => {
                                switch (name) {
                                    case "herbivoreCount":
                                        return [value, `${capitalize(this.state.selectedStatus)} Herbivore Count`]
                                    case "carnivoreCount":
                                        return [value, `${capitalize(this.state.selectedStatus)} Carnivore Count`]
                                }
                            }} />
                            <Line type="monotone" dataKey="herbivoreCount" stroke="#778beb" strokeWidth={2} />
                            <Line type="monotone" dataKey="carnivoreCount" stroke="#f3a683" strokeWidth={2} />
                        </LineChart>
                    </div>
                </div>
            </>
        );
    }
}

export default CreatureDietChart;
