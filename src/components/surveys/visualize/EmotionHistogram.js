import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {mapFilenamesToEmotionIds} from "../../../services/videoMetaDataHelper";
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";

const EmotionHistogram = ({filenames}) => {

    const [chartData, setChartData] = useState({})


    useEffect(() => {

        const emotionIds = mapFilenamesToEmotionIds(filenames);

        // Step 2: Count each emotion ID
        const emotionIdCounts = {};
        emotionIds.forEach(emotionId => {
            if (emotionId in emotionIdCounts) {
                emotionIdCounts[emotionId]++;
            } else {
                emotionIdCounts[emotionId] = 1;
            }
        });
        const histData = Object.entries(emotionIdCounts).map(([key, val]) => ({
            emotion: getEmotionFromId(key),
            count: val
        }));

        setChartData(histData)

    }, [filenames]);

    return (
        <div>

                <div>
                    <BarChart width={800} height={400} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="emotion" label={{value: 'Emotion ID', position: 'insideBottomRight', dy: 10}} />

                        <YAxis label={{value: 'Count', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip/>
                        <Bar dataKey="count" fill="#8884d8"/>
                    </BarChart>
                </div>

        </div>
    );
};

export default EmotionHistogram;