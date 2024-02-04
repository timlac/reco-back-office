import React, {createContext, useContext, useState, useEffect} from 'react';
import {createFilename2Frequency, invertFilename2Frequency} from "../services/filenameHandling/createFilename2Frequency";
import {useParams} from "react-router-dom";
import {useFetchSurveys} from "../hooks/useFetchSurveys";
import {useFetchProject} from "../hooks/useFetchProject";

import {updateProjectMetadata} from "../services/metadataManager";

const SurveyDataContext = createContext(null);

export const useSurveyData = () => useContext(SurveyDataContext);


export const SurveyDataProvider = ({children }) => {

    const [frequency2Filename, setFrequency2Filename] = useState({});
    const [isFrequencyLoading, setIsFrequencyLoading] = useState(true);

    const {projectName} = useParams();

    const { surveyData, isLoading: surveysIsLoading, fetchSurveys } = useFetchSurveys(projectName);

    const { projectData, isLoading: projectsIsLoading, fetchProject} = useFetchProject(projectName);

    useEffect(() => {

        // Ensure both surveyData and projectData are loaded and not loading
        if (!surveysIsLoading && !projectsIsLoading && projectData) {
            const filename2Freq = createFilename2Frequency(surveyData, projectData.s3_experiment_objects);
            setFrequency2Filename(invertFilename2Frequency(filename2Freq));
            setIsFrequencyLoading(false); // Indicate that frequency calculation is done

        }
    }, [surveyData, projectData, surveysIsLoading, projectsIsLoading]);

    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    useEffect(() => {
        updateProjectMetadata(projectData?.s3_objects_with_meta);
    }, [projectData]);

    const isLoading = surveysIsLoading || projectsIsLoading || isFrequencyLoading;

    return (
        <SurveyDataContext.Provider
            value={
                {
                    frequency2Filename,
                    surveyData,
                    isLoading,
                    fetchSurveys,
                    projectName,
                    projectData
                }
            }>
            {children}
        </SurveyDataContext.Provider>
    );
};
