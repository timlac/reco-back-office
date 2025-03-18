import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {filterFrequency2Filename} from "../../../services/filenameHandling/filterFilenames";
import {
    createFilename2Frequency,
    invertFilename2Frequency
} from "../../../services/filenameHandling/createFilename2Frequency";
import {getFinished} from "../../../services/utils";


const ItemBarChart = ({filterOnFinished}) => {

    const {isLoading, projectData, surveyData} = useSurveyData()

    const [frequency2Filename, setFrequency2Filename] = useState({});
    const [isFrequencyLoading, setIsFrequencyLoading] = useState(true);

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


    // Convert frequencyDistribution to array format for recharts
    function getChartData(frequency2Filename) {
        return Object.entries(frequency2Filename).map(([key, val]) => ({
            numOccurrences: key,
            count: val.length,
        }));
    }

    return (
        <div>
            {chartData &&
                <div>
                    <BarChart width={400} height={400} data={chartData} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="numOccurrences"
                               label={{value: 'Survey Occurrences', position: 'insideBottomRight', dy: 10}}/>
                        <YAxis label={{value: 'Number of Items', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip/>
                        <Bar dataKey="count" fill="#8884d8"/>
                    </BarChart>
                </div>
            }
        </div>
    );
};

export default ItemBarChart;