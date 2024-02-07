import ItemHistogram from "./ItemHistogram";
import EmotionHistogram from "./EmotionHistogram";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import React from "react";

export const Visualizations = () => {

    const {surveyData, isLoading} = useSurveyData()

    console.log("surveydata in visualizations", surveyData)

    return (
        <div>
            <ItemHistogram/>

            {isLoading ?
                <div>Loading...</div>
                :

                <div>
                    <EmotionHistogram/>
                </div>}

        </div>
    )
}
