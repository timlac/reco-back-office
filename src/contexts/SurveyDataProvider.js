import React, {createContext, useContext, useState, useEffect} from 'react';
import {fetchVideoData} from "../services/videoMetaDataHelper";
import {emotionCategoriesApi, emotionScalesApi} from "../services/api";
import {createFilename2FrequencyObj} from "../services/createFilename2FrequencyObj";
import {createFrequency2FilenameObj} from "../services/createFrequency2FilenameObj";


const SurveyDataContext = createContext(null);

export const useSurveyData = () => useContext(SurveyDataContext);


// API Map
const apiMap = {
    categories: emotionCategoriesApi,
    scales: emotionScalesApi,
    // Add more mappings here
};


export const SurveyDataProvider = ({children}) => {
    const [surveyData, setSurveyData] = useState([]);
    const [frequency2FilenameObj, setFrequency2FilenameObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [apiType, setApiType] = useState('categories'); // New state for API type


    const fetchSurveys = async () => {
        try {
            const api = apiMap[apiType]

            const response = await api.get("surveys");
            console.log(response)

            const surveyData = response.data.map(user => ({
                ...user,
                created_at: new Date(user.created_at),
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

    const switchApiType = (newType) => {
        if (apiType !== newType) {
            setApiType(newType);
        }
    };

    // Fetch video data
    useEffect(() => {
        fetchVideoData()
            .then(fetchSurveys)
            .catch(error => console.error('Error fetching video data:', error));
    }, [apiType]);

    return (
        <SurveyDataContext.Provider value={{frequency2FilenameObj, surveyData, isLoading, fetchSurveys, switchApiType}}>
            {children}
        </SurveyDataContext.Provider>
    );
};
