import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {useEffect, useState} from "react";
import _ from "lodash";


import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";
import {Col, Row, Statistic} from "antd";
import {customStd} from "../../../services/utils";
import {TIME_SPENT_CUT_OFF} from "../../../config";


export const TotalTimeSpentHistogram = () => {
    const {surveyData} = useSurveyData()
    const [histData, setHistData] = useState([])

    function formatMinutes(value) {
        return (value / 60) // Converts seconds to minutes and formats to one decimal place
    }

    useEffect(() => {
        const timeSpentPerUser = []

        for (const survey of surveyData) {
            if (survey.progress === 1) {
                const itemTimes = survey.survey_items.map(item => {
                    return item.time_spent_on_item > TIME_SPENT_CUT_OFF ?
                        TIME_SPENT_CUT_OFF / 1000 :
                        item.time_spent_on_item / 1000;
                })
                const totalTime = _.sum(itemTimes)

                timeSpentPerUser.push({
                    surveyId: survey.survey_id,
                    time: formatMinutes(totalTime),
                })
            }
        }

        timeSpentPerUser.sort((a, b) => a.time - b.time);

        setHistData(timeSpentPerUser)
    }, [surveyData]);


    return (
        <div>
            {histData &&
                (<>
                        <Row>
                            <Col span={4}>
                                <Statistic title="Mean:" value={
                                    (_.meanBy(histData, "time")).toFixed(2) + " m"}/>
                            </Col>
                            <Col span={4}>
                                <Statistic title="Std:"
                                           value={(customStd(histData.map(
                                                   item => item.time))
                                           ).toFixed(2) + " m"}/>

                            </Col>
                        </Row>
                        <BarChart width={600} height={400} data={histData}
                                  margin={{top: 40, right: 30, bottom: 30, left: 20}}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="surveyId"
                                   label={{value: 'Survey Id', position: 'insideBottomRight', dy: 10}}/>
                            <YAxis label={{value: 'Total Time (m)', angle: -90, position: 'insideLeft'}}/>
                            <Tooltip formatter={(value) => `${value.toFixed(2)} m`} />
                            <Bar dataKey="time" fill="#FFBB28"/>
                        </BarChart>
                    </>
                )
            }
        </div>
    )
}