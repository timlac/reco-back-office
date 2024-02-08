import {FloatButton, Table} from "antd";
import {Link} from "react-router-dom";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";
import {exportToCsv} from "../../../services/exportToCsv";

export const SurveyTable = () => {

    const {surveyData, projectName} = useSurveyData()

    // Generate a unique list of user_id values for filtering
    const userIdFilters = Array.from(new Set(surveyData.map(item => item.user_id)))
        .map(user_id => ({
            text: user_id,
            value: user_id,
        }));

    const columns = [
        {
            title: 'Survey Id',
            dataIndex: 'survey_id',
            key: 'survey_id',
            render: (text) => <Link to={`${text}`}>{text}</Link>
        },
        {
            title: 'User Id',
            dataIndex: 'user_id',
            key: 'user_id',
            filters: userIdFilters,
            onFilter: (value, record) => record.user_id === value,
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
        <div>
            <Table dataSource={surveyData} rowKey="survey_id" columns={columns}/>
            <FloatButton tooltip={<div>Export</div>} onClick={() => {
                console.log('onClick')
                exportToCsv(projectName, surveyData, 'export.csv', ["survey_id", "user_id"]);

            }
            }/>;
        </div>
    )
}