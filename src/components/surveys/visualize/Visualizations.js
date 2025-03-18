import ItemBarChart from "./ItemBarChart";
import EmotionBarChart from "./EmotionBarChart";
import React, {useState} from 'react';
import {Card, Col, Row, Switch} from 'antd';
import {ProgressView} from "./ProgressView";
import {TimeSpentPerItemHistogram} from "./TimeSpentPerItemHistogram";
import {TotalTimeSpentHistogram} from "./TotalTimeSpentHistogram";


export const Visualizations = () => {

    const [filterOnFinished, setFilterOnFinished] = useState(false)

    const onFilterOnFinishedChange = (checked) => {
        setFilterOnFinished(checked)
    }


    return (
        <div>
            <Row gutter={2}>
                <Col span={12}>
                    <Card
                        title="Item Occurence"
                    >
                        <Card title="Survey Progress Filter">
                            <p>Toggle between displaying items present in all surveys or only finished surveys</p>
                            <Switch checkedChildren="Finished" unCheckedChildren="All"
                                    onChange={onFilterOnFinishedChange}/>
                        </Card>
                        <h3>Item Counts</h3>
                        <p>This chart displays how often different items occur in existing surveys.
                            It is usually desirable that all items occur the same number of times when data collection
                            is finished </p>
                        <ItemBarChart filterOnFinished={filterOnFinished}/>
                        {/*<h3>Emotion Counts</h3>*/}
                        {/*<p>This chart displays how often different emotions occur in existing surveys.*/}
                        {/*    It is usually desirable that this distribution reflects the distribution of emotions in the full dataset. </p>*/}
                        {/*<EmotionBarChart filterOnFinished={filterOnFinished}/>*/}
                    </Card>
                </Col>
                <Col span={12}>

                    <Card
                        title="Progress"
                    >
                        <ProgressView/>
                    </Card>

                    <Card title="Time Consumption Analysis">
                        {/*<h3>Time Spent per Item</h3>*/}
                        {/*<TimeSpentPerItemHistogram/>*/}
                        <h3>Total Time Spent</h3>
                        <TotalTimeSpentHistogram/>
                    </Card>

                </Col>

            </Row>
        </div>
    );
};
