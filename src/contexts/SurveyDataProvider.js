import React, {createContext, useContext, useState, useEffect} from 'react';
import {api} from "../services/api";
import {createFilename2FrequencyObj} from "../services/createFilename2FrequencyObj";
import {createFrequency2FilenameObj} from "../services/createFrequency2FilenameObj";


const SurveyDataContext = createContext(null);

export const useSurveyData = () => useContext(SurveyDataContext);

// const surveyTypes = new Set(
//     ["categories",
//         "scales"]
// );


export const SurveyDataProvider = ({children}) => {
    const [surveyData, setSurveyData] = useState([]);
    const [frequency2FilenameObj, setFrequency2FilenameObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [surveyType, setSurveyType] = useState('categories'); // New state for API type


    const fetchSurveys = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(surveyType + "/surveys");
            console.log(response)

            const surveyData = response.data.map(survey => ({
                ...survey,
                created_at: new Date(survey.created_at),
            }));
            setSurveyData(surveyData);

            const filename2FrequencyObj = createFilename2FrequencyObj(surveyData);
            const newFrequency2FilenameObj = createFrequency2FilenameObj(filename2FrequencyObj);
            setFrequency2FilenameObj(newFrequency2FilenameObj);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
    };

    const switchSurveyType = (newType) => {
        if (surveyType !== newType) {
            setSurveyData([])
            setFrequency2FilenameObj({})
            setIsLoading(true)
            setSurveyType(newType);
        }
    };

    // Fetch video data
    useEffect(() => {
        fetchSurveys()
    }, [surveyType]);

    return (
        <SurveyDataContext.Provider
            value={
                {
                    frequency2FilenameObj,
                    surveyData,
                    isLoading,
                    fetchSurveys,
                    switchSurveyType,
                    surveyType
                }
            }>

            {children}
        </SurveyDataContext.Provider>
    );
};
