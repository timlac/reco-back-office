import React, {useEffect, useState} from "react";
import api from "../../services/api";
import MyScatterPlot from "../visualize/MyScatterPlot";
import CreateUser from "./CreateUser";
import {FrequencyCalculator} from "./FrequencyCalculator";
import MyHistogram from "../visualize/MyHistogram";


export const UserCoordinator = () => {

    const [videoData, setVideoData] = useState([])
    const [existingUsers, setExistingUsers] = useState([])
    const [filenameCounts, setFilenameCounts] = useState({})


    useEffect(() => {
        // Check if both videoData and existingUsers are loaded
        if (videoData.length > 0 && existingUsers.length > 0) {
            setFilenameCounts(FrequencyCalculator(existingUsers, videoData));

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
            <CreateUser filenameCounts={filenameCounts} videoData={videoData}/>
            <MyHistogram filenameCounts={filenameCounts}/>
        </div>
    )
}