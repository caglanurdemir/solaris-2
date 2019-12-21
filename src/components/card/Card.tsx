import * as FontAwesomeIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

export interface CardProps {
    iconBackgroundColor: string;
    iconName: string;
    title: string;
    subtitle: string;
    className: string;
}

class Card extends React.Component<CardProps, {}> {
    render() {
        const { iconBackgroundColor, iconName, title, subtitle, className } = this.props;
        return (
            <>
                <Col className={className} span={6}>
                    <div className="card">
                        <Row>
                            <Col className="icon-wrapper" span={6} style={{ backgroundColor: iconBackgroundColor }}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={FontAwesomeIcons[iconName]} size="3x" />
                                </div>
                            </Col>
                            <Col span={18}>
                                <Row className="title">{title}</Row>
                                <Row className="subtitle">{subtitle}</Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </>
        );
    }
}


export default Card;
