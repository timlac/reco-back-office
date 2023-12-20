import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Progress} from "antd";
import {useSurveyData} from "../../contexts/SurveyDataProvider";


function getProgress(surveyItems) {
    const numberOfReplies = surveyItems.filter(obj => obj.has_reply === '1').length
    return numberOfReplies / surveyItems.length;
}

function getAccuracy(surveyItems) {
    const numberOfCorrect = surveyItems.filter(obj => obj.emotion_id === obj.reply).length

    return numberOfCorrect / surveyItems.length;
}

function getSurvey(surveyData, surveyId){
    const ret = surveyData.filter( obj => obj.id === surveyId )

    if (ret.length !== 1)
        throw new Error(`something went wrong, more than one survey matches survey id: ${surveyId}`)
    else {
        return ret[0]
    }

}

const SurveyDetails = () => {

    console.log("in survey details")

    const { surveyData, isLoading } = useSurveyData()

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
            setData( getSurvey( surveyData, surveyId) ) // Fetching survey data
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        } finally {
            setLoading(false);
        }
    }, [surveyId, surveyData, isLoading]); // Dependency array includes surveyId and userData

    return (
        <div>

            {loading ?
                <p>Loading...</p>
                :
                <div>
                    <p>Progress:</p>
                    <Progress type="circle" percent={getProgress(data.survey_items) * 100}/>

                    <p>Accuracy:</p>
                    <Progress type="circle" percent={getAccuracy(data.survey_items).toFixed(3) * 100}/>
                </div>
            }
            <p>Survey ID: {surveyId}</p>
            {/* Display other survey details here */}
        </div>
    );
};

export default SurveyDetails;