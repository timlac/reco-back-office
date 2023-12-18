import React, {useEffect, useState} from "react";

import CreateSurvey from "./CreateSurvey";
import ItemHistogram from "../visualize/ItemHistogram";

import {emotionCategoriesApi} from "../../services/api";
import { createFilename2FrequencyObj } from "../../services/createFilename2FrequencyObj";
import {createFrequency2FilenameObj} from "../../services/createFrequency2FilenameObj";
import {fetchVideoData} from "../../services/videoMetaDataHelper";

import {SurveyTable} from "./SurveyTable";

const lodash = require('lodash');


export const UserCoordinator = () => {
    // TODO: This rerenders waaaaay to often. Make it only it new data when users are actually created...

    const [users, setUsers] = useState([])

    const [didFetchUsers, setDidFetchUsers] = useState(false)

    const [fetchNewUsers, setFetchNewUsers] = useState(false)

    const [frequency2FilenameObj, setFrequency2FilenameObj] = useState({})

    const [didFetchMetadata, setDidFetchMetadata] = useState(false)

    useEffect(() => {
        console.log("fetching video data")
        fetchVideoData()
            .then(() => setDidFetchMetadata(true))
            .catch(error => {
                console.error('Error fetching video data:', error);
            });
    }, []);

    useEffect(() => {
        // Check if both videoData and users are loaded
        if (didFetchMetadata && didFetchUsers) {

            console.log("calculating frequencies")

            const filename2FrequencyObj = createFilename2FrequencyObj(users)
            console.log("filename2FrequencyObj")
            console.log(Object.keys(filename2FrequencyObj.allEmotions).length)

            const frequency2FilenameObj = createFrequency2FilenameObj(filename2FrequencyObj)
            setFrequency2FilenameObj( frequency2FilenameObj )

            console.log("frequency2FilenameObj")
            console.log(frequency2FilenameObj)
            console.log(frequency2FilenameObj.positiveEmotions)
            console.log(typeof frequency2FilenameObj.positiveEmotions)

        }
    }, [didFetchMetadata, users, didFetchUsers])

    const fetchUsers = async () => {
        console.log("invoking fetch users")
        const response = await emotionCategoriesApi.get("users")
        console.log(response.data)

        const userData = response.data.map(user => ({
            ...user,
            created_at: new Date(user.created_at), // Convert the createdAt date
        }));

        console.log("userData: ", userData)

        setUsers(userData)
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


    return (
        <div>
            <CreateSurvey frequency2FilenameObj={frequency2FilenameObj} setFetchNewUsers={setFetchNewUsers}/>


            <SurveyTable users={users}/>

            {lodash.isEmpty(frequency2FilenameObj) ?
            "Loading...":
            <ItemHistogram frequency2FilenameObj={frequency2FilenameObj} />
                }
        </div>
    )
}