import { useCallback, useState } from 'react';
import { api } from "../services/api";

export const useFetchProject = (projectName) => {
    const [projectData, setProjectData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProject = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`projects/${projectName}`);
            setProjectData(response.data);

        } catch (err) {
            setError(err);
            console.error('Error fetching projects:', err);
        } finally {
            setIsLoading(false);
        }
    }, [projectName]);

    return { projectData, isLoading, error, fetchProject };
};
