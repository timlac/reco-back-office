import {Table} from "antd";

export const SurveyTable = ({users}) => {

    const columns = [
        {
            title: 'Survey Id',
            dataIndex: 'id',
            key: 'id',
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
        },
    ];
    return (
        <Table dataSource={users} rowKey="id" columns={columns}/>
    )
}