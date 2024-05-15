import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Card, Col, Radio, Row, Space, Switch} from "antd";
import {ALL, NEGATIVE_VALENCE, POSITIVE_VALENCE} from "../../../config";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {filterFrequency2Filename} from "../../../services/filenameHandling/filterFilenames";
import {
    createFilename2Frequency,
    invertFilename2Frequency
} from "../../../services/filenameHandling/createFilename2Frequency";
import {getFinished} from "../../../services/utils";


const ItemHistogram = () => {

    const {isLoading, projectData, surveyData} = useSurveyData()

    const [frequency2Filename, setFrequency2Filename] = useState({});
    const [isFrequencyLoading, setIsFrequencyLoading] = useState(true);
    const [filterOnValence, setFilterOnValence] = useState(ALL);
    const [filterOnFinished, setFilterOnFinished] = useState(false)

    const [chartData, setChartData] = useState({})


    useEffect(() => {
        if (!isLoading) {
            let filename2Freq
            if (filterOnFinished) {
                filename2Freq = createFilename2Frequency((getFinished(surveyData) || []), projectData.s3_experiment_objects);
            } else {
                filename2Freq = createFilename2Frequency(surveyData, projectData.s3_experiment_objects);

            }
            setFrequency2Filename(invertFilename2Frequency(filename2Freq));
            setIsFrequencyLoading(false); // Indicate that frequency calculation is done
        }
    }, [filterOnFinished, projectData, surveyData, isLoading]);


    const onValenceChange = (e) => {
        console.log('radio checked', e.target.value);
        setFilterOnValence(e.target.value);
    };

    const onFilterOnFinishedChange = (checked) => {
        setFilterOnFinished(checked)
    }


    useEffect(() => {
        const filteredFrequency2Filename = filterFrequency2Filename(frequency2Filename, filterOnValence)
        setChartData(getChartData(filteredFrequency2Filename))
    }, [filterOnValence, frequency2Filename]);

    // Convert frequencyDistribution to array format for recharts
    function getChartData(frequency2Filename) {
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
                    <Row>
                        {/*<Col>*/}
                        {/*    <Card title="Valence Filter">*/}
                        {/*        <Radio.Group onChange={onValenceChange} value={filterOnValence}>*/}
                        {/*            <Space direction="vertical">*/}
                        {/*                <Radio value={ALL}>All</Radio>*/}
                        {/*                <Radio value={POSITIVE_VALENCE}>Negative</Radio>*/}
                        {/*                <Radio value={NEGATIVE_VALENCE}>Positive</Radio>*/}
                        {/*            </Space>*/}
                        {/*        </Radio.Group>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                        <Col>
                            <Card title="Survey Progress Filter">
                                <p>Toggle between displaying items present in all surveys or only finished surveys</p>
                                <Switch checkedChildren="Finished" unCheckedChildren="All" onChange={onFilterOnFinishedChange} />
                            </Card>
                        </Col>
                    </Row>
                    <p></p>
                    <BarChart width={400} height={400} data={chartData}>
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