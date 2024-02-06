import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Progress, Space} from "antd";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
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
    const numberOfCorrect = surveyItems.filter(obj => obj.emotion_1_id === obj.reply).length
    const numberOfReplies = getNumberOfReplies(surveyItems)

    if (numberOfReplies > 0) {
        return numberOfCorrect / getNumberOfReplies(surveyItems)
    } else {
        return 0
    }
}

function getSurvey(surveyData, surveyId) {

    console.log("survey data in getSurvey: ", surveyData)

    const ret = surveyData.filter(obj => obj?.survey_id === surveyId)

    console.log(ret)

    if (ret.length > 1)
        throw new Error(`Something went wrong, more than one survey matches survey id: ${surveyId}`)
    else if (ret.length === 0) {
        throw new Error(`Something went wrong, no survey found for: ${surveyId}`)
    } else {
        return ret[0]
    }
}

const SurveyDetails = () => {

    const {surveyData, isLoading} = useSurveyData()
    const {surveyId} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            // If userData is not yet loaded, don't do anything
            return;
        }
        try {
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
                            <Progress type="circle" percent={(getProgress(data?.survey_items) * 100).toFixed(1)}/>
                        </Card>
                        <Card size="small" title="Accuracy">
                            <Progress type="circle" percent={(getAccuracy(data?.survey_items) * 100).toFixed(1)}/>
                        </Card>
                    </Space>
                    <ItemDisplay survey={data}></ItemDisplay>

                    <EmotionAlternativesDisplay emotionAlternatives={data.emotion_alternatives}/>
                </div>
            }

        </div>
    );
};

export default SurveyDetails;