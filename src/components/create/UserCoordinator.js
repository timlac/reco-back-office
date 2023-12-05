import React, {useEffect, useState} from "react";
import {emotionCategoriesApi} from "../../services/api";
import CreateUser from "./CreateUser";
import {CreateFrequencyDict, FrequencyCalculator} from "./FrequencyCalculator";
import MyHistogram from "../visualize/MyHistogram";
import {fetchVideoData} from "../../services/videoMetaDataHelper";

import {getEmotionInSweFromId} from 'nexa-js-sentimotion-mapper';

export const UserCoordinator = () => {

    const [users, setUsers] = useState([])

    const [didFetchUsers, setDidFetchUsers] = useState(false)

    const [fetchNewUsers, setFetchNewUsers] = useState(false)

    const [frequencyDict, setFrequencyDict] = useState({})

    const [metaDataIsLoaded, setMetaDataIsLoaded] = useState(false)

    useEffect(() => {
        console.log("fetching video data")
        fetchVideoData()
            .then(() => setMetaDataIsLoaded(true))
            .catch(error => {
                console.error('Error fetching video data:', error);
            });
    }, []);

    useEffect(() => {
        // Check if both videoData and users are loaded
        if (metaDataIsLoaded && didFetchUsers) {
            const filenameCounts = FrequencyCalculator(users);
            console.log("filenameCounts")
            console.log(filenameCounts)

            const frequencyDict = CreateFrequencyDict(filenameCounts)

            setFrequencyDict(frequencyDict)

            console.log("frequencydict")
            console.log(frequencyDict)

        }
    }, [metaDataIsLoaded, users, didFetchUsers])


    const fetchUsers = async () => {
        console.log("invoking fetch users")
        const response = await emotionCategoriesApi.get("users")
        console.log(response.data)

        setUsers(response.data)
        setDidFetchUsers(true)
        setFetchNewUsers(false)
        console.log(users)
    }

    useEffect(() => {
        console.log("fetch new users invoked")
        console.log("fetchNewUsers:", fetchNewUsers)

        fetchUsers()
            .catch(err => console.log(err));
    }, [fetchNewUsers]);


    const emotionId = getEmotionInSweFromId(5);

    return (
        <div>
            <div>{emotionId}</div>
            <CreateUser frequencyDict={frequencyDict} setFetchNewUsers={setFetchNewUsers}/>
            <MyHistogram frequencyDict={frequencyDict}/>
        </div>
    )
}