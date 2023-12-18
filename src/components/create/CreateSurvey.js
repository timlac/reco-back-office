import React from 'react';
import {emotionCategoriesApi} from "../../services/api";
import {filename2MetaData} from "../../services/videoMetaDataHelper";
import {POSITIVE_VALENCE, NEGATIVE_VALENCE} from "../../config"
import BasicForm from "./BasicForm";
import {generateSamples} from "../../services/sampling/generateSamples";
import {useUserData} from "../../contexts/UserDataProvider";


const CreateSurvey = () => {

    const { fetchUsers, frequency2FilenameObj } = useUserData()

    const createSurvey = (values) => {

        console.log("in handle submit")

        let samples = {}

        switch (values.valence){
            case POSITIVE_VALENCE:
                // {...} is to pass COPY to function
                samples = generateSamples({ ...frequency2FilenameObj.positiveEmotions })
                break;
            case NEGATIVE_VALENCE:
                // pass copy to function
                samples = generateSamples( { ...frequency2FilenameObj.negativeEmotions })
                break;
            default:
                console.log("no valence selected in create user")
        }

        console.log("samples:")
        console.log(samples.emotionAlternatives)

        console.log([...samples.emotionAlternatives])

        const survey_items = []

        for (const filename of samples.shuffledFilenames) {

            const metaData = filename2MetaData[filename]

            const item = {
                "filename": filename,
                "video_id": metaData["video_id"],
                "emotion_id": metaData["emotion_id"],
            }
            survey_items.push(item)
        }

        const body = {
            "user_id": values.email,
            "survey_id": values.surveyId,
            "survey_items": survey_items,
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
            .then(fetchUsers)
            .catch(error => console.log(error))
    }

    return <div>
        <BasicForm createUser={createSurvey} />
    </div>

}

export default CreateSurvey