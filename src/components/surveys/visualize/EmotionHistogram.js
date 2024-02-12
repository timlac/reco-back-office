import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";

const EmotionHistogram = ({filenames}) => {

    const {surveyData, isLoading} = useSurveyData()

    const [chartData, setChartData] = useState({})


    useEffect(() => {

        const emotionIdCounts = {};

        for (const survey of surveyData) {
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

    }, [filenames, surveyData]);

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return <div>
            <BarChart width={400} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="emotion" label={{value: 'Emotion ID', position: 'insideBottomRight', dy: 10}}/>

                <YAxis label={{value: 'Count', angle: -90, position: 'insideLeft'}}/>
                <Tooltip/>
                <Bar dataKey="count" fill="#8884d8"/>
            </BarChart>
        </div>
    }
};

export default EmotionHistogram;