import {Collapse, Table} from 'antd';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";

const ItemDisplay = ({surveyItems}) => {

    const columns = [
        {
            title: 'Filename',
            dataIndex: 'filename',
            key: 'filename',
        },
        {
            title: 'Emotion',
            dataIndex: 'emotion_id',
            key: 'emotion',
            render: (emotionId) => getEmotionFromId(emotionId)
        },
        {
            title: 'Emotion Id',
            dataIndex: 'emotion_id',
            key: 'emotion_id',
        },
        {
            title: 'Has Reply',
            dataIndex: 'has_reply',
            key: 'has_reply',
        },
        {
            title: 'Reply',
            dataIndex: 'reply',
            key: 'reply',
        }

    ]
    return <Collapse>
        <Collapse.Panel key={1} header={"Items"}>
            <Table dataSource={surveyItems} rowKey="survey_id" columns={columns} size="small"/>
        </Collapse.Panel>
    </Collapse>;
};
export default ItemDisplay;