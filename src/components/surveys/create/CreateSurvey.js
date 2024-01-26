import React, {useState} from 'react';
import filename2MetaData from "../../../data/filename2metadata.json";
import {SCALES, emotionScales} from "../../../config"
import SurveyForm from "./SurveyForm";
import {generateSamples} from "../../../services/sampling/generateSamples";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {api} from "../../../services/api";
import SurveySummary from "../display/SurveySummary";
import ItemDisplay from "../display/ItemDisplay";
import EmotionAlternativesDisplay from "../display/EmotionAlternativesDisplay";
import {message} from "antd";
import {filterFrequency2Filename} from "../../../services/filenameHandling/filterFilenames";


const CreateSurvey = () => {

    const {fetchSurveys, frequency2Filename, surveyType} = useSurveyData()
    const [survey, setSurvey] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const createSurvey = (values) => {

        setIsLoading(true)

        console.log("logging values")
        console.log(values)

        let samples = {}

        const filteredFrequency2Filename = filterFrequency2Filename(frequency2Filename, values.subset)
        samples = generateSamples(filteredFrequency2Filename, values.numOfEmotionAlternatives)

        console.log("samples:")
        console.log(samples.emotionAlternatives)

        console.log([...samples.emotionAlternatives])

        const surveyItems = []

        for (const filename of samples.shuffledFilenames) {

            const metaData = filename2MetaData[filename]

            const item = {
                "filename": filename,
                "video_id": metaData["video_id"],
                "emotion_id": metaData["emotion_id"],
            }
            surveyItems.push(item)
        }

        let body = {
            "user_id": values.user_id,
            "survey_items": surveyItems,
            "emotion_alternatives": [...samples.emotionAlternatives],
            "valence": values.valence,
            "sex": values.sex,
            "date_of_birth": values.dateString
        }

        if (surveyType === SCALES) {
            body = {...body, "reply_format": emotionScales}
        } else {
            body = {...body, "reply_format": []}
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
                        <ItemDisplay survey={survey}></ItemDisplay>
                        <EmotionAlternativesDisplay
                            emotionAlternatives={survey.emotion_alternatives}></EmotionAlternativesDisplay>
                    </div>

                )}
            </div>
        </div>
    );
}

export default CreateSurvey