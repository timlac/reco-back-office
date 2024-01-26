import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {api} from "../services/api";
import {createFilename2Frequency, invertFilename2Frequency} from "../services/filenameHandling/createFilename2Frequency";
import {useParams} from "react-router-dom";


const SurveyDataContext = createContext(null);

export const useSurveyData = () => useContext(SurveyDataContext);


export const SurveyDataProvider = ({children}) => {
    const [surveyData, setSurveyData] = useState([]);
    const [frequency2Filename, setFrequency2Filename] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {surveyType} = useParams();

    const fetchSurveys = useCallback(async () => {
        try {
            setIsLoading(true)
            setSurveyData([])
            setFrequency2Filename({})
            const response = await api.get(surveyType + "/surveys");
            console.log("Logging response in fetchSurveys: ", response)

            const surveyData = response.data.map(survey => ({
                ...survey,
                created_at: new Date(survey.created_at),
            }));
            setSurveyData(surveyData);

            const filename2Frequency = createFilename2Frequency(surveyData);

            setFrequency2Filename(invertFilename2Frequency(filename2Frequency));
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
                    frequency2Filename,
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
