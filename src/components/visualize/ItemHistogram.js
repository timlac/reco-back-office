import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Radio, Space} from "antd";
import {ALL, NEGATIVE_VALENCE, PILOT, POSITIVE_VALENCE} from "../../config";
import {useSurveyData} from "../../contexts/SurveyDataProvider";
import {filterFrequency2Filename} from "../../services/filterFilenames";


const ItemHistogram = () => {

    const { frequency2Filename, isLoading } = useSurveyData()

    const [value, setValue] = useState(ALL);
    const [chartData, setChartData] = useState({})

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    useEffect(() => {
        const filteredFrequency2Filename = filterFrequency2Filename(frequency2Filename, value)
        setChartData( getChartData(filteredFrequency2Filename) )
    }, [value, frequency2Filename]);

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
                            <Radio value={ALL}>All</Radio>
                            <Radio value={POSITIVE_VALENCE}>Negative</Radio>
                            <Radio value={NEGATIVE_VALENCE}>Positive</Radio>
                            <Radio value={PILOT}>Pilot</Radio>

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