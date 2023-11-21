import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import {repeatedSampling, sample} from "./Sample";
import MyScatterPlot from "../visualize/MyScatterPlot";


const CreateUser = () => {

    const [userName, setUserName] = useState("")
    const [videoData, setVideoData] = useState([])

    const [existingUsers, setExistingUsers] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        const allSamples = repeatedSampling(videoData)

        const items = []

        for (let i = 0; i < allSamples.length; i++) {

            const filename = allSamples[i]
            const row = videoData.find((row) => row.filename === filename)

            const item = {
                "filename": filename,
                "video_id": row["video_id"],
                "emotion_id": row["emotion_id"],
                "reply": "",
            }
            items.push(item)
        }

        const body = {
            "alias": userName,
            "items": items
        }

        api.post("users", body).then(console.log).catch(error => console.log(error))
    }

    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    const fetchVideos = api.get("videos")

    useEffect(() => {
        if (videoData.length === 0) {
            console.log("invoking fetchVideos")
            fetchVideos
                .then(response => {
                    console.log(response.data)
                    setVideoData(response.data)

                }
            ).catch(err => console.log(err));
        }
    }, [videoData]);


    const fetchUsers = api.get("users")

    useEffect(() => {
        fetchUsers
            .then(response => {
                console.log(response.data)
                setExistingUsers(response.data)
            }
            ).catch(err => console.log(err));
    }, []);

    return <div>
        <div>Create a new user:</div>
        <form onSubmit={handleSubmit}>
            <input
                name="alias"
                type="text"
                value={userName}
                onChange={handleChange}
            />
            <button type="submit">Send</button>
        </form>

        <div>Here are some S3 objects</div>

        <MyScatterPlot data={existingUsers}/>

      {/*  <ul>*/}
      {/*  {videoData.slice(0, 10).map((video, index) => (*/}
      {/*    <li key={index}>{video}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*  <div>{videoData.length}</div>*/}




    </div>

}

export default CreateUser