import React, {useEffect, useState} from "react";

import CreateUser from "./CreateUser";
import MyHistogram from "../visualize/MyHistogram";

import {emotionCategoriesApi} from "../../services/api";
import { createFilename2FrequencyObj } from "../../services/CreateFilename2FrequencyObj";
import {createFrequency2FilenameObj} from "../../services/createFrequency2FilenameObj";
import {fetchVideoData} from "../../services/videoMetaDataHelper";

import {getEmotionInSweFromId} from 'nexa-js-sentimotion-mapper';
import BasicForm from "./BasicForm";
import {UserTable} from "./UserTable";

const lodash = require('lodash');


export const UserCoordinator = () => {

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

        }
    }, [didFetchMetadata, users, didFetchUsers])

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


    return (
        <div>
            <CreateUser frequency2FilenameObj={frequency2FilenameObj} setFetchNewUsers={setFetchNewUsers}/>


            <UserTable users={users}/>

            {lodash.isEmpty(frequency2FilenameObj) ?
            "Loading...":
            <MyHistogram frequency2FilenameObj={frequency2FilenameObj} />
                }
        </div>
    )
}