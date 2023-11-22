import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const MyHistogram = ({frequencyDict}) => {


    // Convert frequencyDistribution to array format for recharts
    const chartData = Object.entries(frequencyDict).map(([key, val]) => ({
        numOccurrences: key,
        count: val.length
    }));

    console.log("chartData")
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