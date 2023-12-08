import {Table} from "antd";

export const UserTable = ({users}) => {

    const columns = [
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
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