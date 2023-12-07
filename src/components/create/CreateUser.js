import React, {useState} from 'react';
import {emotionCategoriesApi} from "../../services/api";
import {filename2MetaData} from "../../services/videoMetaDataHelper";
import {Switch} from 'antd';
import {POSITIVE_VALENCE, NEGATIVE_VALENCE} from "../../config"
import {getUserSamples} from "./GetUserSamples";




const CreateUser = ( {frequency2FilenameObj, setFetchNewUsers} ) => {

    const [userName, setUserName] = useState("")
    const [valence, setValence] = useState(POSITIVE_VALENCE)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("in handle submit")

        let samples = {}

        switch (valence){
            case POSITIVE_VALENCE:
                // pass copy to function
                samples = getUserSamples({ ...frequency2FilenameObj.positiveEmotions })
                break;
            case NEGATIVE_VALENCE:
                // pass copy to function
                samples = getUserSamples( { ...frequency2FilenameObj.negativeEmotions })
                break;
            default:
                console.log("no valence selected in create user")
        }

        console.log("samples:")
        console.log(samples.emotionAlternatives)

        console.log([...samples.emotionAlternatives])

        const user_items = []

        for (const filename of samples.shuffledFilenames) {

            const metaData = filename2MetaData[filename]

            const item = {
                "filename": filename,
                "video_id": metaData["video_id"],
                "emotion_id": metaData["emotion_id"],
            }
            user_items.push(item)
        }

        const body = {
            "user_id": userName,
            "user_items": user_items,
            "emotion_alternatives": [...samples.emotionAlternatives],
            "valence": valence
        }

        console.log("body:")
        console.log(body)

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