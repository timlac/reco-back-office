import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";

const EmotionBarChart = ({filterOnFinished}) => {

    const {surveyData} = useSurveyData()

    const [chartData, setChartData] = useState({})


    useEffect(() => {

        const emotionIdCounts = {};

        for (const survey of surveyData) {

            if (filterOnFinished) {
                if (survey.progress !== 0) {
                    continue
                }
            }

            for (const surveyItem of survey.survey_items) {
                const emotionId = surveyItem.metadata.emotion_1_id
                if (emotionId in emotionIdCounts) {
                    emotionIdCounts[emotionId]++;
                } else {
                    emotionIdCounts[emotionId] = 1;
                }

            }
        }
        const histData = Object.entries(emotionIdCounts).map(([key, val]) => ({
            emotion: getEmotionFromId(key),
            count: val
        }));

        setChartData(histData)

        console.log(histData)

    }, [surveyData, filterOnFinished]);


    return <div>
        {chartData &&

            <BarChart width={400} height={400} data={chartData} margin={{top: 20, right: 30, bottom: 30, left: 20}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="emotion" label={{value: 'Emotion ID', position: 'insideBottomRight', dy: 10}}/>

                <YAxis label={{value: 'Survey Occurrences', angle: -90, position: 'insideLeft'}}/>
                <Tooltip/>
                <Bar dataKey="count" fill="#008080"/>
            </BarChart>
        }
    </div>

};

export default EmotionBarChart;