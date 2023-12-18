import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {emotionCategoriesApi} from "../../services/api";
import {Progress} from "antd";


function getProgress(surveyItems) {
    const numberOfReplies = surveyItems.filter(obj => obj.has_reply === '1').length
    return numberOfReplies / surveyItems.length;
}

function getAccuracy(surveyItems) {
    const numberOfCorrect = surveyItems.filter(obj => obj.emotion_id === obj.reply).length

    return numberOfCorrect / surveyItems.length;
}

const SurveyDetails = () => {
    const {surveyId} = useParams();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Make the API call when the component mounts
        emotionCategoriesApi.get(`users/${surveyId}`)
            .then(response => {
                // Handle the successful response
                console.log(response.data)
                setData(response.data);
                setLoading(false);

            })
            .catch(err => {
                // Handle errors
                console.log(err)
                setLoading(false);
            });

        // Cleanup function to cancel pending requests when the component unmounts
        return () => {
            // Cancel the Axios request if needed
        };
    }, [surveyId]);

    // Fetch survey details based on surveyId and display them

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