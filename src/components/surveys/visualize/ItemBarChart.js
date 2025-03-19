import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {invertFilename2Frequency} from "../../../services/filenameHandling/createFilename2Frequency";


// TODO: Fix this, need maybe the api to return freq2filename instead of filename2freq, or do conversion in front end...

const ItemBarChart = ({ stats }) => {
    const chartData = Object.entries(invertFilename2Frequency(stats)).map(([frequency, filenames]) => ({
        frequency,
        count: filenames.length
    }));

    return (
        <div>
            <BarChart width={500} height={400} data={chartData} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="frequency" label={{ value: 'Frequency', position: 'insideBottomRight', dy: 10 }} />
                <YAxis label={{ value: 'Number of Replies', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default ItemBarChart;
