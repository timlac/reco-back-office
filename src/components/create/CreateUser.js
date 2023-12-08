import React, {useState} from 'react';
import {emotionCategoriesApi} from "../../services/api";
import {filename2MetaData} from "../../services/videoMetaDataHelper";
import {Switch} from 'antd';
import {POSITIVE_VALENCE, NEGATIVE_VALENCE} from "../../config"
import {getUserSamples} from "./GetUserSamples";
import BasicForm from "./BasicForm";




const CreateUser = ( {frequency2FilenameObj, setFetchNewUsers} ) => {

    const createUser = (values) => {

        console.log("in handle submit")

        let samples = {}

        switch (values.valence){
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
            "user_id": values.email,
            "user_items": user_items,
            "emotion_alternatives": [...samples.emotionAlternatives],
            "valence": values.valence,
            "sex": values.sex,
            "date_of_birth": values.dateString
        }

        console.log("body:")
        console.log(body)

        // Need to make sure fetchUsers is invoked after the post request
        emotionCategoriesApi.post("users", body)
            .then(console.log)
            .then(setFetchNewUsers(true))
            .catch(error => console.log(error))
    }

    return <div>
        <BasicForm createUser={createUser} />
    </div>

}

export default CreateUser