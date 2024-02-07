import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Radio, Space} from "antd";
import {ALL, NEGATIVE_VALENCE, POSITIVE_VALENCE} from "../../../config";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {filterFrequency2Filename} from "../../../services/filenameHandling/filterFilenames";
import {
    createFilename2Frequency,
    invertFilename2Frequency
} from "../../../services/filenameHandling/createFilename2Frequency";


const ItemHistogram = () => {

    const { isLoading, projectData, surveyData } = useSurveyData()

    const [frequency2Filename, setFrequency2Filename] = useState({});
    const [isFrequencyLoading, setIsFrequencyLoading] = useState(true);

    useEffect(() => {
        if (!isLoading){
            const filename2Freq = createFilename2Frequency(surveyData, projectData.s3_experiment_objects);
            setFrequency2Filename(invertFilename2Frequency(filename2Freq));
            setIsFrequencyLoading(false); // Indicate that frequency calculation is done
        }
    }, [projectData, surveyData, isLoading]);

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
        {isLoading || isFrequencyLoading ?
                <div>Loading...</div>
                :

                <div>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={ALL}>All</Radio>
                            <Radio value={POSITIVE_VALENCE}>Negative</Radio>
                            <Radio value={NEGATIVE_VALENCE}>Positive</Radio>
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