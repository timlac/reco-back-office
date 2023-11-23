import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import {repeatedSampling} from "./GetSample";
import {filename2MetaData} from "../../services/videoMetaDataHelper";


// Now I want to make sure that no videos currently in users is sampled.


const CreateUser = ( {frequencyDict, fetchUsers} ) => {

    const [userName, setUserName] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("in handle submit")

        const allSamples = repeatedSampling(frequencyDict)

        const items = []

        for (let i = 0; i < allSamples.length; i++) {

            const filename = allSamples[i]
            const metaData = filename2MetaData[filename]


            const item = {
                "filename": filename,
                "video_id": metaData["video_id"],
                "emotion_id": metaData["emotion_id"],
                "reply": "",
            }
            items.push(item)
        }

        const body = {
            "alias": userName,
            "items": items
        }

        // This does not work properly.
        // Need to make sure fetchUsers is invoked after the post request
        api.post("users", body)
            .then(
                fetchUsers()
                .catch(err => console.log(err)))
            .catch(error => console.log(error))

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