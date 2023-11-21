import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


export function FrequencyCalculator(existingUsers, videoData) {

    // Initialize an empty object to store the filename dictionary
    const filenameCounts = {};

    // Iterate through the dataArray
    for (const item of videoData) {
        // Extract the filename from each item
        const filename = item.filename;
        // Add the filename as a key to the filenameDictionary with an initial value of 0
        filenameCounts[filename] = 0;
    }

    // Iterate through the jsonData array
    for (const item of existingUsers) {
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
    const existingUsers = props.existingUsers
    const videoData = props.videoData

    const filenameCounts = FrequencyCalculator(existingUsers, videoData)

    const dataForVisualization = Object.entries(filenameCounts).map(([filename,frequency], index) => ({
        index: index,
        filename: filename,
        frequency: frequency
    }));

    console.log(dataForVisualization)

    const yAxisTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <ScatterChart
            width={800}
            height={400}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid/>
            <XAxis type="number" dataKey="index" name="Filename Index" domain={[0, "dataMax"]}/>
            <YAxis type="number" dataKey="frequency" name="Frequency" ticks={yAxisTicks}/>
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Filename Frequencies" data={dataForVisualization} fill="#8884d8"/>
        </ScatterChart>
    );
}


export default MyScatterPlot;
