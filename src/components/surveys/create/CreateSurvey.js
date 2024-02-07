import React, {useState} from 'react';
import CreateSurveyForm from "./CreateSurveyForm";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {api} from "../../../services/api";
import SurveySummary from "../display/SurveySummary";
import ItemDisplay from "../display/ItemDisplay";
import EmotionAlternativesDisplay from "../display/EmotionAlternativesDisplay";
import {message} from "antd";
import {generateSurveyItems} from "../../../services/survey/generateSurveyItems";
import {VALENCES} from "../../../config";


const CreateSurvey = () => {

    const {fetchSurveys, frequency2Filename, projectName, projectData} = useSurveyData()
    const [survey, setSurvey] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const createSurvey = (values) => {

        setIsLoading(true)

        console.log("projectData: ", projectData)


        const { surveyItems, emotionIds } = generateSurveyItems(
            frequency2Filename,
            Number(projectData.emotions_per_survey),
            Number(projectData.samples_per_survey),
            projectData.balanced_sampling_enabled,
            values.valence);

        // Make sure valence is either positive, negative or null
        const valence = [VALENCES.POSITIVE, VALENCES.NEGATIVE].includes(values.valence) ? values.valence : null;

        let body = {
            "user_id": values.user_id,
            // "survey_items": surveyItems,
            // "emotion_alternatives": emotionIds,
            "valence": valence,
            "sex": values.sex,
            "date_of_birth": values.dateString,
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

            <CreateSurveyForm createSurvey={createSurvey} isLoading={isLoading}/>
            <div>
                {survey && (


                    <div>
                        <SurveySummary data={survey}></SurveySummary>
                        <ItemDisplay survey={survey}></ItemDisplay>
                        <EmotionAlternativesDisplay
                            emotionAlternatives={survey.emotion_ids}></EmotionAlternativesDisplay>
                    </div>

                )}
            </div>
        </div>
    );
}

export default CreateSurvey