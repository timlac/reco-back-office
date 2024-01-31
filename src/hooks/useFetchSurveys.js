import { useCallback, useState } from 'react';
import { api } from "../services/api";

export const useFetchSurveys = (projectName) => {
    const [surveyData, setSurveyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSurveys = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`projects/${projectName}/surveys`);
            const fetchedSurveyData = response.data.map(survey => ({
                ...survey,
                created_at: new Date(survey.created_at),
            }));
            setSurveyData(fetchedSurveyData);

        } catch (err) {
            setError(err);
            console.error('Error fetching surveys:', err);
        } finally {
            setIsLoading(false);
        }
    }, [projectName]);

    return { surveyData, isLoading, error, fetchSurveys };
};
