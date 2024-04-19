import {Button, Collapse, Popover, Table} from 'antd';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";
import {formatTimeToSeconds} from "../../../services/utils";

const ItemDisplay = ({survey, projectdata}) => {

    const scalesDisplay = (reply) => (
        <div>
            <ul>
                {projectdata.reply_format.template_json.dimensions.map((element, index) => (
                    <li key={index}>
                        {element.label}: {reply[index] || null}</li>
                ))}
            </ul>
        </div>
    );


    console.log(survey?.survey_items)

    const uniqueEmotionIds = new Set(survey?.survey_items.map(item => item.metadata.emotion_1_id));

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
            key: 'emotion',
            // render: (emotionId) => getEmotionFromId(emotionId),
            render: (record) => {
                const emotionId = record.metadata?.emotion_1_id; // Safely access nested property
                return getEmotionFromId(emotionId); // Use the emotionId to get and display the emotion
            },
            filters: generateEmotionFilters(),
            onFilter: (value, record) => record.metadata.emotion_1_id === value
        },
        {
            title: 'Emotion Id',
            key: 'emotion_id',
            render: (record) => {
                return record.metadata?.emotion_1_id; // Use the emotionId to get and display the emotion
            },
            filters: generateEmotionIdFilters(),
            onFilter: (value, record) => record.metadata.emotion_1_id === value
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
        },
        {
            title: 'Video Duration',
            dataIndex: 'video_duration',
            key: 'video_duration',
            render: time => formatTimeToSeconds(time)
        },
        {
            title: 'Time Spent',
            dataIndex: 'time_spent_on_item',
            key: 'time_spent_on_item',
            render: time => formatTimeToSeconds(time)
        }
    ]
    return <Collapse>
        <Collapse.Panel key={1} header={"Survey Items"}>
            <Table dataSource={survey?.survey_items} rowKey="filename" columns={columns} size="small"/>
        </Collapse.Panel>
    </Collapse>;
};
export default ItemDisplay;