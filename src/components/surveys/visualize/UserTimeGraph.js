import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import {Card, Col, Row, Statistic} from "antd";
import {TIME_SPENT_CUT_OFF} from "../../../config";
import _ from "lodash";
import {customStd, secondsToHms} from "../../../services/utils";

const UserTimeGraph = ({data}) => {

    const [modifiedData, setModifiedData] = useState([])

    useEffect(() => {

        const timeData = []

        for (const item of data) {
            let timeSpent
            if (item.time_spent_on_item > TIME_SPENT_CUT_OFF) {
                timeSpent = TIME_SPENT_CUT_OFF
            } else {
                timeSpent = item.time_spent_on_item
            }
            const dataObj = {
                timeSpent: timeSpent / 1000,
                videoDuration: item.video_duration / 1000,
            }

            timeData.push(dataObj)
        }
        setModifiedData(timeData)

    }, [data]);


    return (
        <Card title={"Time Spent Analysis"}>
            {modifiedData.length > 0 && <>

                <Row>

                    <LineChart
                        width={700}  // Set suitable width
                        height={300} // Set suitable height
                        data={modifiedData}
                        margin={{top: 5, right: 50, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={(entry, index) => index + 1}>
                            <Label
                                value="Item Number"
                                offset={-5}
                                position="insideBottom"/>
                        </XAxis>
                        <YAxis>
                            <Label
                                value="Seconds"
                                angle={-90}
                                position="insideLeft"
                                style={{textAnchor: 'middle'}}
                                offset={-10}
                                dy={-10}
                            />
                        </YAxis>
                        <Tooltip/>
                        <Legend verticalAlign="top" height={36}/>
                        <Line type="monotone" dataKey="timeSpent" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="videoDuration" stroke="#82ca9d"/>
                    </LineChart>

                    <Col>
                        <Statistic title="Mean Time Spent per Item:" value={_.mean(_.map(modifiedData, 'timeSpent')).toFixed(2) + " s"}/>
                        <Statistic title="Std Time Spent per Item:" value={customStd(_.map(modifiedData, 'timeSpent')).toFixed(2) + " s"}/>
                        <Statistic title="Total Time Spent:" value={secondsToHms(_.sum(_.map(modifiedData, 'timeSpent')).toFixed(2))}/>
                    </Col>


                </Row>
            </>
            }
        </Card>
    );
};

export default UserTimeGraph;
