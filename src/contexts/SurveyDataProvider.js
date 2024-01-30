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
    const {projectName} = useParams();

    const { surveyData, isLoading: surveysIsLoading, fetchSurveys } = useFetchSurveys(projectName);

    const { projectData, isLoading: projectsIsLoading, fetchProject} = useFetchProject(projectName);

    useEffect(() => {

        console.log("in useEffect")
        console.log("surveysIsLoading", surveysIsLoading)
        console.log("projectsIsLoading", projectsIsLoading)
        console.log("surveyData.length", surveyData.length)
        console.log("projectData", projectData)


        // Ensure both surveyData and projectData are loaded and not loading
        if (!surveysIsLoading && !projectsIsLoading && projectData) {
            console.log("projectData.s3_objects ", projectData.s3_objects)

            const filename2Freq = createFilename2Frequency(surveyData, projectData.s3_objects);

            console.log("filename2Freq in SurveyDataProvider")
            console.log(filename2Freq)

            setFrequency2Filename(invertFilename2Frequency(filename2Freq));
        }
    }, [surveyData, projectData, surveysIsLoading, projectsIsLoading]);

    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    useEffect(() => {
        console.log("logging in project data hook", projectData)
        updateProjectMetadata(projectData?.s3_objects_with_meta);
    }, [projectData]);

    const isLoading = surveysIsLoading || projectsIsLoading;

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
