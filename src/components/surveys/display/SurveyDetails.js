import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Collapse, Progress, Space} from "antd";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import SurveySummary from "./SurveySummary";
import ItemDisplay from "./ItemDisplay";
import UserTimeGraph from "../visualize/UserTimeGraph";
import {VisualizeSliderValues} from "../visualize/sliderVisualization/VisualizeSliderValues";
import {getReplyFormat} from "../../../services/utils";
import {api} from "../../../services/api";


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

const SurveyDetails = () => {

    // TODO: visualize slider replies should not be available if not reply dimensions

    const {projectData, projectName} = useSurveyData()
    const {surveyId} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!surveyId) return;

        const fetchSurvey = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get(`projects/${projectName}/surveys/${surveyId}`);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch survey");
                console.error("Error fetching survey:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSurvey();
    }, [surveyId, projectName]);

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

                        {getReplyFormat(projectData) === "dimensions" &&

                            <Collapse.Panel key={4} header={"Visualize slider replies"}>
                                <VisualizeSliderValues survey={data} project={projectData}></VisualizeSliderValues>
                            </Collapse.Panel>
                        }
                    </Collapse>
                </div>
            }
        </div>
    );
};

export default SurveyDetails;