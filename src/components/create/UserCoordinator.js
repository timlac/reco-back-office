import React, {useEffect, useState} from "react";
import api from "../../services/api";
import MyScatterPlot from "../visualize/MyScatterPlot";
import CreateUser from "./CreateUser";
import {CreateFrequencyDict, FrequencyCalculator} from "./FrequencyCalculator";
import MyHistogram from "../visualize/MyHistogram";
import {fetchVideoData} from "../../services/videoMetaDataHelper";


export const UserCoordinator = () => {

    const [existingUsers, setExistingUsers] = useState([])

    const [didFetchExistingUsers, setDidFetchExistingUsers] = useState(false)

    const [filenameCounts, setFilenameCounts] = useState({})
    const [frequencyDict, setFrequencyDict] = useState({})


    const [metaDataIsLoaded, setMetaDataIsLoaded] = useState(false)

    useEffect(() => {
        fetchVideoData()
            .then(() => setMetaDataIsLoaded(true))
            .catch(error => {
                console.error('Error fetching video data:', error);
            });
    }, []);

    useEffect(() => {
        // Check if both videoData and existingUsers are loaded
        if (metaDataIsLoaded && didFetchExistingUsers) {
            const filenameCounts = FrequencyCalculator(existingUsers);

            setFilenameCounts(filenameCounts)

            const frequencyDict = CreateFrequencyDict(filenameCounts)

            setFrequencyDict(frequencyDict)

            console.log("frequencydict")
            console.log(frequencyDict)

        }
    }, [metaDataIsLoaded, existingUsers])


    const fetchUsers = async () => {
        console.log("invoking fetch users")
        const response = await api.get("users")
        setExistingUsers(response.data)
        setDidFetchExistingUsers(true)
    }

    useEffect(() => {
        fetchUsers()
            .catch(err => console.log(err));
    }, []);


    return (
        <div>
            <CreateUser frequencyDict={frequencyDict} fetchUsers={fetchUsers}/>
            <MyHistogram frequencyDict={frequencyDict}/>
        </div>
    )
}