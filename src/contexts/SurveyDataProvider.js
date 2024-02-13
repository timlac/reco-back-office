import React, {createContext, useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useFetchSurveys} from "../hooks/useFetchSurveys";
import {useFetchProject} from "../hooks/useFetchProject";


const SurveyDataContext = createContext(null);

export const useSurveyData = () => useContext(SurveyDataContext);


export const SurveyDataProvider = ({children }) => {
    const {projectName} = useParams();

    const { surveyData, isLoading: surveysIsLoading, fetchSurveys } = useFetchSurveys(projectName);

    const { projectData, isLoading: projectsIsLoading} = useFetchProject(projectName);

    function getSurveyUrl(surveyId) {
        return `${process.env.REACT_APP_SURVEY_PAGE_URL}${projectName}/${surveyId}`
    }

    const isLoading = surveysIsLoading || projectsIsLoading;

    return (
        <SurveyDataContext.Provider
            value={
                {
                    fetchSurveys,
                    surveyData,
                    isLoading,
                    projectName,
                    projectData,
                    getSurveyUrl
                }
            }>
            {children}
        </SurveyDataContext.Provider>
    );
};
