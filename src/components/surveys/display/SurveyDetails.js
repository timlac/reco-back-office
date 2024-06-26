import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Collapse, Progress, Space} from "antd";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import SurveySummary from "./SurveySummary";
import ItemDisplay from "./ItemDisplay";
import UserTimeGraph from "../visualize/UserTimeGraph";
import {VisualizeSliderValues} from "../visualize/sliderVisualization/VisualizeSliderValues";
import {getReplyFormat} from "../../../services/utils";


function getNumberOfReplies(surveyItems) {
    return surveyItems.filter(obj => obj.has_reply === 1).length
}

function getProgress(surveyItems) {
    return getNumberOfReplies(surveyItems) / surveyItems.length;
}

function getAccuracy(surveyItems) {
    const numberOfCorrect = surveyItems.filter(obj => obj.metadata.emotion_1_id === parseInt(obj.reply[0])).length
    const numberOfReplies = getNumberOfReplies(surveyItems)

    if (numberOfReplies > 0) {
        return numberOfCorrect / getNumberOfReplies(surveyItems)
    } else {
        return 0
    }
}

function getSurvey(surveyData, surveyId) {

    const ret = surveyData.filter(obj => obj?.survey_id === surveyId)

    if (ret.length > 1)
        throw new Error(`Something went wrong, more than one survey matches survey id: ${surveyId}`)
    else if (ret.length === 0) {
        throw new Error(`Something went wrong, no survey found for: ${surveyId}`)
    } else {
        return ret[0]
    }
}

const SurveyDetails = () => {

    const {surveyData, projectData, isLoading} = useSurveyData()
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

                        {getReplyFormat(projectData) === "categories" &&
                        <Card size="small" title="Accuracy">
                            <Progress type="circle" percent={(getAccuracy(data?.survey_items) * 100).toFixed(1)}/>
                        </Card>
                        }
                    </Space>

                    <Collapse>
                        <Collapse.Panel key={1} header={"Survey Items"}>
                            <ItemDisplay survey={data} projectData={projectData}></ItemDisplay>
                        </Collapse.Panel>
                        {/*<Collapse.Panel key={2} header={"Emotion Options"}>*/}
                        {/*    <EmotionAlternativesDisplay emotionAlternatives={data.emotion_ids}/>*/}
                        {/*</Collapse.Panel>*/}
                        <Collapse.Panel key={3} header={"Time Analysis"}>
                            <UserTimeGraph data={data?.survey_items}/>
                        </Collapse.Panel>
                        <Collapse.Panel key={4} header={"Visualize slider replies"}>
                            <VisualizeSliderValues survey={data} project={projectData}></VisualizeSliderValues>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            }
        </div>
    );
};

export default SurveyDetails;