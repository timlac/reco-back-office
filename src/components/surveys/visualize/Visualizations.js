import ItemHistogram from "./ItemHistogram";
import EmotionHistogram from "./EmotionHistogram";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import React from "react";
import {getAllFilenames} from "../../../services/utils";

export const Visualizations = () => {

    const {surveyData, isLoading} = useSurveyData()

    console.log("surveydata in vsialuzation", surveyData)

    return (
        <div>
            <ItemHistogram/>

            {isLoading ?
                <div>Loading...</div>
                :

                <div>
                    <EmotionHistogram filenames={getAllFilenames(surveyData)}/>
                </div>}

        </div>
    )
}
