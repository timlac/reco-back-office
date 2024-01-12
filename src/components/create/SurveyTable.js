import {Table} from "antd";
import {Link, useParams} from "react-router-dom";
import {useSurveyData} from "../../contexts/SurveyDataProvider";

export const SurveyTable = () => {

    const { surveyData } = useSurveyData()

    const {surveyType} = useParams()

    console.log("in survey table")
    console.log("survey type ", surveyType)

    console.log(surveyData)

    const columns = [
        {
            title: 'Survey Id',
            dataIndex: 'survey_id',
            key: 'survey_id',
            render: (text) => <Link to={`/protected/survey/${text}`}>{text}</Link>
        },
        {
            title: 'User Id',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Valence',
            dataIndex: 'valence',
            key: 'valence',
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => {
                return date.toLocaleString()
            },
            sorter: (a, b) => {
                return a.created_at - b.created_at
            }
        },
    ];
    return (
        <Table dataSource={surveyData} rowKey="survey_id" columns={columns}/>
    )
}