import ItemHistogram from "./ItemHistogram";
import EmotionHistogram from "./EmotionHistogram";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import React, {useState} from 'react';
import {Card, Col, Row, Space} from 'antd';
import {ProgressView} from "./ProgressView";

const tabList = [
    {
        key: 'tab1',
        tab: 'Items',
    },
    {
        key: 'tab2',
        tab: 'Emotions',
    },
];
const contentList = {
    tab1: <ItemHistogram/>,
    tab2: <EmotionHistogram/>,
};

export const Visualizations = () => {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    return (
        <div>
            <Row gutter={2}>
                <Col span={12}>
                    <Card
                        title="Item Occurence"
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                <Col span={12}>

                    <Card
                          title="Progress"
                    >
                        <ProgressView/>
                    </Card>
                </Col>

            </Row>
        </div>
    );
};
