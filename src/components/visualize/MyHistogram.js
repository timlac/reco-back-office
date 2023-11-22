import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const MyHistogram = ({filenameCounts}) => {

    const frequencyDistribution = Object.values(filenameCounts).reduce((acc, freq) => {
        acc[freq] = (acc[freq] || 0) + 1;
        return acc;
    }, {});

    console.log("frequencyDistribution")
    console.log(frequencyDistribution)

    // Convert frequencyDistribution to array format for recharts
    const chartData = Object.entries(frequencyDistribution).map(([numOccurrences, count]) => ({
        numOccurrences: `${numOccurrences} times`,
        count
    }));

    console.log(chartData)

    return (
        <BarChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="numOccurrences"
                   label={{value: 'Number of Occurrences', position: 'insideBottomRight', dy: 10}}/>
            <YAxis label={{value: 'Count of Filenames', angle: -90, position: 'insideLeft'}}/>
            <Tooltip/>
            {/*<Legend/>*/}
            <Bar dataKey="count" fill="#8884d8"/>
        </BarChart>
    );
};

export default MyHistogram;