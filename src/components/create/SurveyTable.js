import {Table} from "antd";
import {Link} from "react-router-dom";
import {useUserData} from "../../contexts/UserDataProvider";

export const SurveyTable = () => {

    const { userData } = useUserData()

    const columns = [
        {
            title: 'Survey Id',
            dataIndex: 'id',
            key: 'id',
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
        <Table dataSource={userData} rowKey="id" columns={columns}/>
    )
}