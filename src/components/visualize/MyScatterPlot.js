import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


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
    const filenameCounts = props.filenameCounts

    const dataForVisualization = Object.entries(filenameCounts).map(([filename,frequency], index) => ({
        index: index,
        filename: filename,
        frequency: frequency
    }));

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
