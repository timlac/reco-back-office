import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const data = [
    {index: 0, frequency: 12},
    {index: 1, frequency: 9},
    {index: 2, frequency: 14},
    {index: 3, frequency: 5},
    {index: 4, frequency: 7},
    {index: 5, frequency: 3},
    {index: 100, frequency: 2},
    {index: 200, frequency: 15},
    {index: 300, frequency: 8},
    {index: 400, frequency: 12},
    {index: 500, frequency: 4},
    {index: 1000, frequency: 5},
    {index: 1500, frequency: 8},
    {index: 2000, frequency: 3},
    {index: 2500, frequency: 17},
    {index: 3000, frequency: 6},
    {index: 3500, frequency: 10},
    {index: 4000, frequency: 13},
    {index: 4500, frequency: 9},
    {index: 5000, frequency: 4},
    // Add more data points as needed
];

export function FrequencyCalculator(users) {
    // Create an object to store filename counts
    const filenameCounts = {};

    // Iterate through the jsonData array
    for (const item of users) {
        // Check if the 'items' property is an array
        if (Array.isArray(item.items)) {
            // Iterate through the 'items' array
            for (const itemData of item.items) {
                // Extract the 'filename' property from each itemData
                const filename = itemData.filename;

                // Update the filename count in the filenameCounts object
                if (filename in filenameCounts) {
                    filenameCounts[filename]++;
                } else {
                    filenameCounts[filename] = 1;
                }
            }
        }
    }

    // Now, filenameCounts contains the counts of each filename
    console.log(filenameCounts);
    return filenameCounts
}


// Custom tooltip content to display filename
const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Access the full data object
        return (
            <div className="custom-tooltip">
                <p>{`Index: ${data.index}`}</p>
                <p>{`Filename: ${data.filename}`}</p>
                <p>{`Frequency: ${data.frequency}`}</p>
            </div>
        );
    }

    return null;
};


const MyScatterPlot = (props) => {
    const users = props.data

    const filenameCounts = FrequencyCalculator(users)

    const dataForVisualization = Object.entries(filenameCounts).map(([filename,frequency], index) => ({
        index: index,
        filename: filename,
        frequency: frequency
    }));

    console.log(dataForVisualization)

    // const frequencyTable = []
    //
    // for (let i = 0; i < filenameCounts.length; i++) {
    //     const item = {"filename": filenameCounts, }
    // }

    return (
        <ScatterChart
            width={800}
            height={400}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid/>
            <XAxis type="number" dataKey="index" name="Filename Index"/>
            <YAxis type="number" dataKey="frequency" name="Frequency"/>
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Filename Frequencies" data={dataForVisualization} fill="#8884d8"/>
        </ScatterChart>
    );
}


export default MyScatterPlot;
