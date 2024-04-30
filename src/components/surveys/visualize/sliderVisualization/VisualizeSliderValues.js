import {useEffect, useState} from "react";
import {aggregateData} from "./aggregateData";
import {getSliderNames} from "../../../../services/utils";
import {MultipleSelect} from "./MultipleSelect";
import {ScatterDisplay} from "./ScatterDisplay";
import {AxisSelect} from "./AxisSelect";
// import {ScatterDisplay} from "./ScatterDisplay";
// import {parseCSV} from "../services/parseCsv";
// import {MultipleSelect} from "./MultipleSelect";
// import {getUniqueInstances} from "../services/getUniqueInstances";
// import {AxisSelect} from "./AxisSelect";
// import {getAxes} from "../services/getHeaders";
// import {useSurveyData} from "../../../../contexts/SurveyDataProvider";


function getHeaders() {

}

function getUniqueInstances(data) {
    const allInstances = data.map(row => row.filterColumn);
    return Array.from(new Set(allInstances));
}


export const VisualizeSliderValues = ({survey, project}) => {

    const initialFilterOn = ["emotion_1_id"];

    const [filterOn, setFilterOn] = useState(initialFilterOn)

    const [headers, setHeaders] = useState(["emotion_1_id", "emotion_2_id"])

    const [data, setData] = useState([])
    const [dataWithFilterOn, setDataWithFilterOn] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [processedData, setProcessedData] = useState([]);
    const [uniqueInstances, setUniqueInstances] = useState([])
    const [selectedInstances, setSelectedInstances] = useState([]); // New state for selected emotions
    const [availableAxes, setAvailableAxes] = useState([]);

    const [selectedAxes, setSelectedAxes] = useState({}); // Default axes

    console.log(project)

    useEffect(() => {
        const fetchData = () => {
            setData(survey?.survey_items)
            // setHeaders(getHeaders(survey))
            setAvailableAxes(getSliderNames(project))
        };
        fetchData();
    }, [survey, project]);

    useEffect(() => {
        const dataWithFilterColumn = data.map(item => ({
            ...item,
            filterColumn: filterOn.map(key => item.metadata[key]).join('-')
        }))
        setDataWithFilterOn(dataWithFilterColumn)
        setFilteredData(dataWithFilterColumn)

        console.log("data with filter column: ", dataWithFilterColumn)

        let uniqueInstances = getUniqueInstances(dataWithFilterColumn)
        setUniqueInstances(uniqueInstances)
        setSelectedInstances(uniqueInstances)
    }, [data, filterOn])


    useEffect(() => {
        setProcessedData(aggregateData(filteredData, selectedAxes, true))
    }, [selectedAxes, filteredData]);

    useEffect(() => {
        if (availableAxes.length > 0 && (!selectedAxes.x || !selectedAxes.y)) {
            setSelectedAxes({x: 0, y: 1});
        }
    }, [availableAxes]);

    const onAxisChange = (axisType, value) => {
        setSelectedAxes(prevAxes => {
            if (prevAxes[axisType] === value) {
                // If the value isn't changing, return the previous state to avoid triggering an update
                return prevAxes;
            }

            // Only update the state if there's a change
            return {
                ...prevAxes,
                [axisType]: value
            };
        });
    };

    // Handler function to update selectedEmotions
    const handleInstanceChange = (newSelectedInstances) => {
        setSelectedInstances(newSelectedInstances);
        setFilteredData(filterDataByInstances(dataWithFilterOn, newSelectedInstances))
    };

    const handleFilterOnChange = (newSelectedHeaders) => {
        setFilterOn(newSelectedHeaders)
    }

    const filterDataByInstances = (data, instancesToInclude) => {
        return data.filter(item => instancesToInclude.includes(item.filterColumn));
    }

    return (
        <div style={{width: '80%', height: '80%', margin: 'auto'}}>

            {/* Container for the aggregation selection */}
            <div style={{textAlign: 'left'}}>
                <p>Select columns to aggregate by</p>

                {headers.length > 0 && <MultipleSelect
                    selectionOptions={headers}
                    onChange={handleFilterOnChange}
                    defaultValue={filterOn}>
                </MultipleSelect>}
            </div>
            <div style={{textAlign: 'left'}}>

                <p>Select categories to display</p>

                {uniqueInstances.length > 0 && <MultipleSelect
                    selectionOptions={uniqueInstances}
                    onChange={handleInstanceChange}
                    defaultValue={selectedInstances}>
                </MultipleSelect>}
            </div>

            {processedData.length > 0 && <ScatterDisplay data={processedData} instances={selectedInstances}
                                                         selectAxes={selectedAxes} availableAxes={availableAxes}/>}

            <AxisSelect selectedAxes={selectedAxes} availableAxes={availableAxes}
                        onAxisChange={onAxisChange}></AxisSelect>

        </div>
    );
};
