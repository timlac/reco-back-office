import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import {Card} from "antd";
import {TIME_SPENT_CUT_OFF} from "../../../config";

const UserTimeGraph = ({data}) => {

    // const [modifiedData, setModifiedData] = useState([])
    //
    // useEffect(() => {
    //
    //     const timeData = []
    //
    //     for (const item of data) {
    //         if (item.time_spent_on_item > TIME_SPENT_CUT_OFF){
    //             timeData.push(TIME_SPENT_CUT_OFF)
    //         } else {
    //             timeData.push(item.time_spent_on_item)
    //         }
    //     }
    //     setModifiedData(timeData)
    //
    // }, [data]);
    //
    return (
        <Card title={"Time Spent Analysis"}>
            <LineChart
                width={600}  // Set suitable width
                height={300} // Set suitable height
                data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={(entry, index) => index + 1}>
                    <Label
                        value="Item Number"
                        offset={-5}
                        position="insideBottom"/>
                </XAxis>
                {/* TODO: Need to set cutoff here somehow... */}
                <YAxis>
                    <Label
                        value="Time in ms"
                        angle={-90}
                        position="insideLeft"
                        style={{textAnchor: 'middle'}}
                        offset={-10}
                        dy={-10}
                    />
                </YAxis>
                <Tooltip/>
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="time_spent_on_item" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="video_duration" stroke="#82ca9d"/>
            </LineChart>
        </Card>
    );
};

export default UserTimeGraph;
