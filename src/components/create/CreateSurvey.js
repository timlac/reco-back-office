import React, {useState} from 'react';
import {filename2MetaData} from "../../services/videoMetaDataHelper";
import {POSITIVE_VALENCE, NEGATIVE_VALENCE} from "../../config"
import SurveyForm from "./SurveyForm";
import {generateSamples} from "../../services/sampling/generateSamples";
import {useSurveyData} from "../../contexts/SurveyDataProvider";
import useApi from "../../hooks/useApi";
import {getEmotionInSweFromId} from "nexa-js-sentimotion-mapper";


const CreateSurvey = () => {

    const {fetchSurveys, frequency2FilenameObj, apiType, isLoading} = useSurveyData()
    const api = useApi();

    const [survey, setSurvey] = useState(null)

    const createSurvey = (values) => {

        console.log("in handle submit")

        let samples = {}

        switch (values.valence) {
            case POSITIVE_VALENCE:
                // {...} is to pass COPY to function
                samples = generateSamples({...frequency2FilenameObj.positiveEmotions})
                break;
            case NEGATIVE_VALENCE:
                // pass copy to function
                samples = generateSamples({...frequency2FilenameObj.negativeEmotions})
                break;
            case "all":
                samples = generateSamples({...frequency2FilenameObj.allEmotions})
                break;
            default:
                console.log("no valid option for valence selected in create user")
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
            "survey_items": survey_items,
            "emotion_alternatives": [...samples.emotionAlternatives],
            "valence": values.valence,
            "sex": values.sex,
            "date_of_birth": values.dateString
        }

        console.log("body:")
        console.log(body)

        // Need to make sure fetchUsers is invoked after the post request
        api.post("surveys", body)
            .then(response => {
                console.log("returned data: ", response)
                setSurvey(response.data)
            })
            .then(fetchSurveys)
            .catch(error => console.log(error))
    }

    return (
        <div>
            <SurveyForm createSurvey={createSurvey} isLoading={isLoading}/>
            <div>
                {survey && (
                    <div>
                        <p>Survey Successfully Created</p>
                        <p>Survey Id: {survey.id}</p>
                        <p>Survey Type: {apiType}</p>

                        <div>
                            <h1>Emotion Alternatives</h1>
                            <ul>
                                {survey.emotion_alternatives.map((item, index) => (
                                    <li key={index}>{item}: {getEmotionInSweFromId(item)}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateSurvey