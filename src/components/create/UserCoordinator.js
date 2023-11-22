import React, {useEffect, useState} from "react";
import api from "../../services/api";
import MyScatterPlot from "../visualize/MyScatterPlot";
import CreateUser from "./CreateUser";
import {CreateFrequencyDict, FrequencyCalculator} from "./FrequencyCalculator";
import MyHistogram from "../visualize/MyHistogram";


export const UserCoordinator = () => {

    const [videoData, setVideoData] = useState([])
    const [existingUsers, setExistingUsers] = useState([])
    const [filenameCounts, setFilenameCounts] = useState({})
    const [frequencyDict, setFrequencyDict] = useState({})


    useEffect(() => {
        // Check if both videoData and existingUsers are loaded
        if (videoData.length > 0 && existingUsers.length > 0) {
            const filenameCounts = FrequencyCalculator(existingUsers, videoData);

            setFilenameCounts(filenameCounts)

            const frequencyDict = CreateFrequencyDict(filenameCounts)

            setFrequencyDict(frequencyDict)

            console.log("frequencydict")
            console.log(frequencyDict)

        }
    }, [videoData, existingUsers])


    useEffect(() => {
        console.log("Get on videos")
        api.get("videos")
            .then(response => {
                    setVideoData(response.data)

                }
            ).catch(err => console.log(err));

    }, []);


    useEffect(() => {
        console.log("Get on users")
        api.get("users")
            .then(response => {
                    setExistingUsers(response.data)
                }
            ).catch(err => console.log(err));
    }, []);


    return (
        <div>
            <CreateUser frequencyDict={frequencyDict} videoData={videoData}/>
            <MyHistogram frequencyDict={frequencyDict}/>
        </div>
    )
}