import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {api} from "../services/api";
import {createFilename2FrequencyObj} from "../services/createFilename2FrequencyObj";
import {createFrequency2FilenameObj} from "../services/createFrequency2FilenameObj";
import {useParams} from "react-router-dom";


const SurveyDataContext = createContext(null);

export const useSurveyData = () => useContext(SurveyDataContext);


export const SurveyDataProvider = ({children}) => {
    const [surveyData, setSurveyData] = useState([]);
    const [frequency2FilenameObj, setFrequency2FilenameObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {surveyType} = useParams();

    const fetchSurveys = useCallback(async () => {
        try {
            setIsLoading(true)
            setSurveyData([])
            setFrequency2FilenameObj({})
            const response = await api.get(surveyType + "/surveys");
            console.log("Logging response in fetchSurveys: ", response)

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
    }, [surveyType]);

    // Fetch video data
    useEffect(() => {
        fetchSurveys()
    }, [fetchSurveys]);

    return (
        <SurveyDataContext.Provider
            value={
                {
                    frequency2FilenameObj,
                    surveyData,
                    isLoading,
                    fetchSurveys,
                    surveyType
                }
            }>
            {children}
        </SurveyDataContext.Provider>
    );
};
