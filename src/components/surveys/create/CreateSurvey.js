import React, {useState} from 'react';
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
import {getFilenameMetadata} from "../../../services/metadataManager";
import {getEqualDistributionSamples} from "../../../services/sampling2/getEqualDistributionSamples";


const CreateSurvey = () => {

    const {fetchSurveys, frequency2Filename, projectName, projectData} = useSurveyData()
    const [survey, setSurvey] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const createSurvey = (values) => {

        setIsLoading(true)

        console.log("logging values")
        console.log(values)

        let samples = {}

        const filteredFrequency2Filename = filterFrequency2Filename(frequency2Filename, values.subset)
        samples = getEqualDistributionSamples(filteredFrequency2Filename,
            Number(projectData.emotions_per_survey),
            Number(projectData.samples_per_survey))

        console.log("samples:")
        console.log(samples.emotionAlternatives)

        console.log([...samples.emotionAlternatives])

        const surveyItems = []

        for (const filename of samples.shuffledFilenames) {

            const metaData = getFilenameMetadata(filename)

            const item = {
                "filename": filename,
                "video_id": metaData["video_id"],
                "emotion_id": metaData["emotion_1_id"],
            }
            surveyItems.push(item)
        }

        let body = {
            "survey_type": projectData.survey_type,
            "s3_folder": projectData.s3_folder,
            "user_id": values.user_id,
            "survey_items": surveyItems,
            "emotion_alternatives": [...samples.emotionAlternatives],
            "valence": values.valence,
            "sex": values.sex,
            "date_of_birth": values.dateString
        }

        if (projectData.survey_type === SCALES) {
            body = {...body, "reply_format": emotionScales}
        } else {
            body = {...body, "reply_format": []}
        }

        console.log("body:")
        console.log(body)

        // Need to make sure fetchUsers is invoked after the post request
        api.post(`projects/${projectName}/surveys/` , body)
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
            <h1>Create New Survey</h1>

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