import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {useEffect, useState} from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';



function getFinished(surveys) {
    return surveys.filter(obj => obj.progress === 1).length;
}

function getStarted(surveys) {
    // Filter surveys where progress is greater than 0 and less than 1
    return surveys.filter(obj => obj.progress > 0 && obj.progress < 1).length;
}

export const ProgressView = () => {
    const { surveyData, isLoading } = useSurveyData();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (surveyData) {
            const finishedCount = getFinished(surveyData);
            const startedCount = getStarted(surveyData)
            const unStartedCount = surveyData.length - finishedCount - startedCount;
            const data = [
                { name: 'Not Started', count: unStartedCount },
                { name: 'Started', count: startedCount },
                { name: 'Finished', count: finishedCount },
            ];
            setChartData(data);
        }
    }, [surveyData]);

    return (
        <div>
            {!isLoading && chartData.length > 0 && (
                <BarChart width={300} height={400} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
};