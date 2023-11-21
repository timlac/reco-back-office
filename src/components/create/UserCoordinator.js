import React, {useEffect, useState} from "react";
import api from "../../services/api";
import MyScatterPlot from "../visualize/MyScatterPlot";
import CreateUser from "./CreateUser";


export const UserCoordinator = () => {

    const [videoData, setVideoData] = useState([])
    const [existingUsers, setExistingUsers] = useState([])


    useEffect(() => {
        api.get("videos")
            .then(response => {
                    console.log(response.data)
                    setVideoData(response.data)

                }
            ).catch(err => console.log(err));

    }, []);


    useEffect(() => {
        api.get("users")
            .then(response => {
                    console.log(response.data)
                    setExistingUsers(response.data)
                }
            ).catch(err => console.log(err));
    }, []);


    return (
        <div>
            <CreateUser videoData={videoData}/>
            <MyScatterPlot existingUsers={existingUsers} videoData={videoData}/>
        </div>
    )
}