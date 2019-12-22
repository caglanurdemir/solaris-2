import * as FontAwesomeIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { capitalize, getTableDataByDate } from '../../../util/utilFunctions';


interface DailyTableProps {
    selectedDate: string;
}

const columns = [
    {
        title: "Implant Code",
        dataIndex: "id",
        key: "id",
        align: "center" as const
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        align: "center" as const,
        render: (age) => capitalize(age),
        filters: [
            {
                text: 'Young',
                value: 'young',
            },
            {
                text: 'Adult',
                value: 'adult',
            }
        ],
        onFilter: (value, record) => record.age.indexOf(value) === 0
    },
    {
        title: "Diet",
        dataIndex: "diet",
        key: "diet",
        align: "center" as const,
        render: (diet) => capitalize(diet),
        filters: [
            {
                text: 'Herbivore',
                value: 'herbivore',
            },
            {
                text: 'Carnivore',
                value: 'carnivore',
            }
        ],
        onFilter: (value, record) => record.diet.indexOf(value) === 0
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center" as const,
        render: (status: string) => {
            switch (status) {
                case "alive":
                    return <Tag color="#ea8685" style={{ width: "80%" }}>
                        <FontAwesomeIcon icon={FontAwesomeIcons.faHeart} /> Alive
            </Tag>;
                case "dead":
                    return <Tag color="#596275" style={{ width: "80%" }}>
                        <FontAwesomeIcon icon={FontAwesomeIcons.faDizzy} /> Dead
            </Tag>;
                case "unknown":
                    return <Tag color="#f7d794" style={{ width: "80%" }}>
                        <FontAwesomeIcon icon={FontAwesomeIcons.faQuestion} /> Unknown
            </Tag>;
            }
        },
        filters: [
            {
                text: 'Alive',
                value: 'alive',
            },
            {
                text: 'Dead',
                value: 'dead',
            },
            {
                text: 'Unknown',
                value: 'unknown',
            }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0
    },
    {
        title: "Taxonomy",
        dataIndex: "taxonomy",
        key: "taxonomy",
        align: "center" as const,
        render: (columnData: string[]) => {
            return <span>
                {
                    columnData.map((t) => {
                        return <Tag>{capitalize(t)}</Tag>;
                    })
                }
            </span>
        }
    }
];

class DailyTable extends React.Component<DailyTableProps, {}> {
    render() {
        const { selectedDate } = this.props;
        return (
            <Table bordered={true} size="middle" style={{ marginTop: "32px" }} dataSource={getTableDataByDate(selectedDate)} columns={columns} />
        );
    }
}

export default DailyTable;
