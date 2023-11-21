import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import {sample} from "./Sample";


const CreateUser = () => {

    const [userName, setUserName] = useState("")
    const [videoData, setVideoData] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault()

        const samples1 = sample(videoData);

        // Filter videoData to exclude rows that match samples1
        const videoDataFiltered1 = videoData.filter((row) => !samples1.includes(row.filename));

        // Obtain samples2 based on the filtered data
        const samples2 = sample(videoDataFiltered1);

        // Filter videoDataFiltered1 to exclude rows that match samples2 for the third sampling
        const videoDataFiltered2 = videoDataFiltered1.filter((row) => !samples2.includes(row.filename));

        // Obtain samples3 based on the second filtered data
        const samples3 = sample(videoDataFiltered2);

        const allSamples = samples1.concat(samples2, samples3 /* add more if needed */);

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
            .then(response => console.log(response.data)
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

      {/*  <ul>*/}
      {/*  {videoData.slice(0, 10).map((video, index) => (*/}
      {/*    <li key={index}>{video}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*  <div>{videoData.length}</div>*/}




    </div>

}

export default CreateUser