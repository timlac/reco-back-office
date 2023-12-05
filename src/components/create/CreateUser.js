import React, {useState} from 'react';
import {emotionCategoriesApi} from "../../services/api";
import {filename2MetaData} from "../../services/videoMetaDataHelper";
import {Switch} from 'antd';
import {POSITIVE_VALENCE, NEGATIVE_VALENCE} from "../../config"
import {filterOnValence} from "./FilterOnValence";
import {getUserSamples} from "./GetUserSamples";


// Now I want to make sure that no videos currently in users is sampled.


const CreateUser = ({frequencyDict, setFetchNewUsers}) => {


    console.log(frequencyDict)

    const [userName, setUserName] = useState("")

    const [valence, setValence] = useState(POSITIVE_VALENCE)


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("in handle submit")

        frequencyDict = filterOnValence(frequencyDict, valence)
        const allSamples = getUserSamples(frequencyDict)

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
        emotionCategoriesApi.post("users", body)
            .then(console.log)
            .then(setFetchNewUsers(true))
            .catch(error => console.log(error))
        setUserName("")
    }

    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    const handleToggle = (e) => {
        if (e) {
            setValence(POSITIVE_VALENCE)
        } else {
            setValence(NEGATIVE_VALENCE)
        }
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
            <Switch checkedChildren={POSITIVE_VALENCE} unCheckedChildren={NEGATIVE_VALENCE} defaultChecked onChange={handleToggle}/>
            <div>{valence}</div>
        </form>
    </div>

}

export default CreateUser