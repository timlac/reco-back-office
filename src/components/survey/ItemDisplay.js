import {Collapse, Table} from 'antd';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";

const ItemDisplay = ({surveyItems}) => {

    const uniqueEmotionIds = new Set(surveyItems.map(item => item.emotion_id));

    // Function to generate unique filter options for emotion_id
    const generateEmotionIdFilters = () => {
        return Array.from(uniqueEmotionIds).map(emotionId => ({
            text: emotionId.toString(),
            value: emotionId,
        }));
    };

    // Function to generate unique filter options for emotion_id
    const generateEmotionFilters = () => {
        return Array.from(uniqueEmotionIds).map(emotionId => ({
            text: getEmotionFromId(emotionId),
            value: emotionId,
        }));
    };



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
            render: (emotionId) => getEmotionFromId(emotionId),
            filters: generateEmotionFilters(),
            onFilter: (value, record) => record.emotion_id === value
        },
        {
            title: 'Emotion Id',
            dataIndex: 'emotion_id',
            key: 'emotion_id',
            filters: generateEmotionIdFilters(),
            onFilter: (value, record) => record.emotion_id === value
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
        <Collapse.Panel key={1} header={"Survey Items"}>
            <Table dataSource={surveyItems} rowKey="filename" columns={columns} size="small"/>
        </Collapse.Panel>
    </Collapse>;
};
export default ItemDisplay;