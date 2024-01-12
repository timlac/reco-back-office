import React, {useState} from 'react';
import filename2MetaData from "../../data/filename2Metadata.json";
import {POSITIVE_VALENCE, NEGATIVE_VALENCE} from "../../config"
import SurveyForm from "./SurveyForm";
import {generateSamples} from "../../services/sampling/generateSamples";
import {useSurveyData} from "../../contexts/SurveyDataProvider";
import {api} from "../../services/api";
import SurveySummary from "../survey/SurveySummary";
import ItemDisplay from "../survey/ItemDisplay";
import EmotionAlternativesDisplay from "../survey/EmotionAlternativesDisplay";
import {message} from "antd";


const CreateSurvey = () => {

    const {fetchSurveys, frequency2FilenameObj, surveyType} = useSurveyData()
    const [survey, setSurvey] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const createSurvey = (values) => {

        setIsLoading(true)

        console.log("isLoading in begin: " + isLoading)

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
        api.post(surveyType + "/surveys", body)
            .then(response => {
                console.log("returned data: ", response)
                setSurvey(response.data)
                message.success("Survey successfully created!")
            })
            .then(fetchSurveys)
            .then(() => setIsLoading(false))
            .catch(error => {
                console.log(error)
                message.error(`Error creating the survey: ${error.message}`);
            })
    }


    return (
        <div>
            <SurveyForm createSurvey={createSurvey} isLoading={isLoading}/>
            <div>
                {survey && (


                    <div>
                        <SurveySummary data={survey}></SurveySummary>
                        <ItemDisplay surveyItems={survey.survey_items}></ItemDisplay>
                        <EmotionAlternativesDisplay
                            emotionAlternatives={survey.emotion_alternatives}></EmotionAlternativesDisplay>
                    </div>

                )}
            </div>
        </div>
    );
}

export default CreateSurvey