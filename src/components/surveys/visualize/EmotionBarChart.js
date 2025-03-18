import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getEmotionFromId } from "nexa-js-sentimotion-mapper";

const EmotionBarChart = ({ stats }) => {
    const chartData = Object.entries(stats).map(([emotionId, count]) => ({
        emotion: getEmotionFromId(emotionId),
        count
    }));

    return (
        <div>
            <BarChart width={500} height={400} data={chartData} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="emotion" label={{ value: 'Emotion', position: 'insideBottomRight', dy: 10 }} />
                <YAxis label={{ value: 'Survey Occurrences', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#008080" />
            </BarChart>
        </div>
    );
};

export default EmotionBarChart;
