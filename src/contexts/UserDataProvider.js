import React, { createContext, useContext, useState, useEffect } from 'react';
import {fetchVideoData} from "../services/videoMetaDataHelper";
import {emotionCategoriesApi} from "../services/api";
import {createFilename2FrequencyObj} from "../services/createFilename2FrequencyObj";
import {createFrequency2FilenameObj} from "../services/createFrequency2FilenameObj";


const UserDataContext = createContext(null);

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
    const [surveys, setSurveys] = useState([]);
    const [frequency2FilenameObj, setFrequency2FilenameObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch video data
    useEffect(() => {
        fetchVideoData()
            .then(() => {
                // Fetch users after video data is loaded
                fetchUsers();
            })
            .catch(error => console.error('Error fetching video data:', error));
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await emotionCategoriesApi.get("users");
            const surveyData = response.data.map(user => ({
                ...user,
                created_at: new Date(user.created_at),
            }));
            setSurveys(surveyData);

            const filename2FrequencyObj = createFilename2FrequencyObj(surveyData);
            const newFrequency2FilenameObj = createFrequency2FilenameObj(filename2FrequencyObj);
            setFrequency2FilenameObj(newFrequency2FilenameObj);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <UserDataContext.Provider value={{ frequency2FilenameObj, surveys, isLoading, setSurveys }}>
            {children}
        </UserDataContext.Provider>
    );
};
