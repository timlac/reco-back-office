import React from 'react';
import {Descriptions} from 'antd';
import {useSurveyData} from "../../../contexts/SurveyDataProvider";

const SurveySummary = ({data}) => {
    const {getSurveyUrl, getSurveyHttpsUrl} = useSurveyData()

    const url = getSurveyUrl(data.survey_id)
    const httpsUrl = getSurveyHttpsUrl(data.survey_id)

    return (
        <div>
            <Descriptions title="Survey Info" column={1} size="small" bordered={true}>
                <Descriptions.Item label="Url">  <a href={url}>{url}</a></Descriptions.Item>
                <Descriptions.Item label="Https Url">  <a href={httpsUrl}>{httpsUrl}</a></Descriptions.Item>
                <Descriptions.Item label="User Id">{data.user_id}</Descriptions.Item>
                <Descriptions.Item label="Sex">{data.sex}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{data.date_of_birth}</Descriptions.Item>
                <Descriptions.Item label="Valence">
                    {data.valence}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default SurveySummary;