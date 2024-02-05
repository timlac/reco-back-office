import {Button, Collapse, Popover, Table} from 'antd';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";

const ItemDisplay = ({survey}) => {

    const scalesDisplay = (reply) => (
        <div>
            <ul>
                {survey.reply_format.dimensions.map((element, index) => (
                    <li key={index}>
                        {element.label}:  {reply[index] || null}</li>
                ))}
            </ul>
        </div>
    );


    const uniqueEmotionIds = new Set(survey?.survey_items.map(item => item.emotion_1_id));

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
            dataIndex: 'emotion_1_id',
            key: 'emotion',
            render: (emotionId) => getEmotionFromId(emotionId),
            filters: generateEmotionFilters(),
            onFilter: (value, record) => record.emotion_1_id === value
        },
        {
            title: 'Emotion Id',
            dataIndex: 'emotion_1_id',
            key: 'emotion_id',
            filters: generateEmotionIdFilters(),
            onFilter: (value, record) => record.emotion_1_id === value
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
            render: (reply, record) => {

                if (reply && Array.isArray(reply) && reply.length > 1) {
                    // console.log("in if")
                    return (
                        <Popover content={scalesDisplay(reply)} title="Scales" trigger="hover">
                            <Button>Replies</Button>
                        </Popover>
                    )
                } else {
                    // console.log("in else")
                    return reply
                }
            }
        }

    ]
    return <Collapse>
        <Collapse.Panel key={1} header={"Survey Items"}>
            <Table dataSource={survey?.survey_items} rowKey="filename" columns={columns} size="small"/>
        </Collapse.Panel>
    </Collapse>;
};
export default ItemDisplay;