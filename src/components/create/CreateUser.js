import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import {repeatedSampling} from "./Sampler";


// Now I want to make sure that no videos currently in users is sampled.


const CreateUser = (props) => {

    const [userName, setUserName] = useState("")

    const filenameCounts = props.filenameCounts
    const videoData = props.videoData

    const handleSubmit = (e) => {
        e.preventDefault()

        const allSamples = repeatedSampling(videoData, filenameCounts)

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
        setUserName("")
    }

    const handleChange = (e) => {
        setUserName(e.target.value)
    }

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
    </div>

}

export default CreateUser