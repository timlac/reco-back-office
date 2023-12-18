import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Radio, Space} from "antd";
import {NEGATIVE_VALENCE, POSITIVE_VALENCE} from "../../config";
import {useUserData} from "../../contexts/UserDataProvider";


const ItemHistogram = () => {

    const { frequency2FilenameObj, isLoading } = useUserData()

    console.log(frequency2FilenameObj)

    const [value, setValue] = useState("all");
    const [chartData, setChartData] = useState({})

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    useEffect(() => {
        switch (value){
            case "all":
                setChartData( getChartData(frequency2FilenameObj?.allEmotions || {}) )
                break;
            case POSITIVE_VALENCE:
                setChartData( getChartData(frequency2FilenameObj?.positiveEmotions  || {}) )
                break;
            case NEGATIVE_VALENCE:
                setChartData(  getChartData(frequency2FilenameObj?.negativeEmotions  || {}) )
                break;
            default:
                console.log("no data selected")
        }

    }, [value, frequency2FilenameObj]);

    // Convert frequencyDistribution to array format for recharts
    function getChartData (frequency2Filename)
    {
        return Object.entries(frequency2Filename).map(([key, val]) => ({
            numOccurrences: key,
            count: val.length
        }));
    }

    return (
        <div>
        {isLoading ?
                <div>Loading...</div>
                :

                <div>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={"all"}>All</Radio>
                            <Radio value={POSITIVE_VALENCE}>{POSITIVE_VALENCE}</Radio>
                            <Radio value={NEGATIVE_VALENCE}>{NEGATIVE_VALENCE}</Radio>
                        </Space>
                    </Radio.Group>


                    <BarChart width={800} height={400} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="numOccurrences"
                               label={{value: 'Number of Occurrences', position: 'insideBottomRight', dy: 10}}/>
                        <YAxis label={{value: 'Count of Filenames', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip/>
                        {/*<Legend/>*/}
                        <Bar dataKey="count" fill="#8884d8"/>
                    </BarChart>
                </div>
        }
        </div>
    );
};

export default ItemHistogram;