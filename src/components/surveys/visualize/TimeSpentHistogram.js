import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";
import {useEffect, useState} from "react";
import _ from "lodash";


import {bin} from 'd3-array';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";
import {Col, Row, Statistic} from "antd";
import {customStd} from "../../../services/utils";
import {TIME_SPENT_CUT_OFF} from "../../../config";


export const TimeSpentHistogram = () => {
    const {surveyData} = useSurveyData()
    const [histData, setHistData] = useState({})
    const [timeSpentArray, setTimeSpentArray] = useState([])

    useEffect(() => {
        const timeSpent = surveyData.flatMap(survey =>
            survey.survey_items
                .filter(item => item.time_spent_on_item !== null)
                .map(item => {
                    return item.time_spent_on_item > TIME_SPENT_CUT_OFF ? TIME_SPENT_CUT_OFF : item.time_spent_on_item;
                })
        );

        setTimeSpentArray(timeSpent)
    }, [surveyData]);


    useEffect(() => {
        const histogramBins = bin().thresholds(40)(timeSpentArray);
        setHistData(
            histogramBins.map(
                (d) => (
                    {
                        value: d.x0 + (d.x1 - d.x0) / 2,
                        // value: `${d.x0} to ${d.x1}`,
                        count: d.length
                    }
                )
            )
        )
    }, [timeSpentArray]);


    return (
        <div>
            {histData &&
                (<>
                        <Row>
                            <Col span={3}>
                <Statistic title="Mean:" value={(_.mean(timeSpentArray)).toFixed() + " ms"} />
                                </Col>
                            <Col span={3}>
                                <Statistic title="Std:" value={(customStd(timeSpentArray)).toFixed() + " ms"} />

                            </Col>
                            </Row>
                <BarChart width={600} height={400} data={histData} margin={{top: 40, right: 30, bottom: 30, left: 20}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="value"
                           label={{value: 'Time Spent (ms)', position: 'insideBottomRight', dy: 10}}/>
                    <YAxis label={{value: 'Number of Items', angle: -90, position: 'insideLeft'}}/>
                    <Tooltip/>
                    <Bar dataKey="count" fill="#FFBB28"/>
                </BarChart>
                </>
                )
            }
        </div>
    )
}