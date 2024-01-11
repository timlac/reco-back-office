import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Progress, Space} from "antd";
import {useSurveyData} from "../../contexts/SurveyDataProvider";
import EmotionHistogram from "../visualize/EmotionHistogram";
import {getFilenames} from "../../services/utils";
import SurveySummary from "./SurveySummary";
import EmotionAlternativesDisplay from "./EmotionAlternativesDisplay";
import ItemDisplay from "./ItemDisplay";


function getNumberOfReplies(surveyItems) {
    return surveyItems.filter(obj => obj.has_reply === '1').length
}

function getProgress(surveyItems) {
    return getNumberOfReplies(surveyItems) / surveyItems.length;
}

function getAccuracy(surveyItems) {
    const numberOfCorrect = surveyItems.filter(obj => obj.emotion_id === obj.reply).length
    const numberOfReplies = getNumberOfReplies(surveyItems)

    if (numberOfReplies > 0) {
        return numberOfCorrect / getNumberOfReplies(surveyItems)
    } else {
        return 0
    }
}

function getSurvey(surveyData, surveyId) {
    const ret = surveyData.filter(obj => obj.survey_id === surveyId)

    if (ret.length !== 1)
        throw new Error(`something went wrong, more than one survey matches survey id: ${surveyId}`)
    else {
        return ret[0]
    }

}

const SurveyDetails = () => {

    console.log("in survey details")

    const {surveyData, isLoading} = useSurveyData()

    console.log("surveyData: ", surveyData)

    const {surveyId} = useParams();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            console.log("isLoading... returning")

            // If userData is not yet loaded, don't do anything
            return;
        }
        try {

            console.log("getting survey data")
            setLoading(true);
            setData(getSurvey(surveyData, surveyId)) // Fetching survey data
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        } finally {
            setLoading(false);
        }
    }, [surveyId, surveyData, isLoading]); // Dependency array includes surveyId and userData

    return (
        <div>
            {
                data ?
                    <SurveySummary data={data}/>
                    :
                    <>Loading</>
            }
            {loading ?
                <p>Loading...</p>
                :
                <div>
                    <Space direction="horizontal" size={16}>
                        <Card size="small" title="Progress">
                            <Progress type="circle" percent={(getProgress(data.survey_items) * 100).toFixed(1)}/>
                        </Card>
                        <Card size="small" title="Accuracy">
                            <Progress type="circle" percent={(getAccuracy(data.survey_items) * 100).toFixed(1)}/>
                        </Card>
                    </Space>
                    <ItemDisplay surveyItems={data.survey_items}></ItemDisplay>

                    <EmotionAlternativesDisplay emotionAlternatives={data.emotion_alternatives}/>
                </div>
            }

        </div>
    );
};

export default SurveyDetails;