import React, {useEffect, useState} from 'react';
import {Collapse, Table} from 'antd';
import {getEmotionFromId} from "nexa-js-sentimotion-mapper";

const EmotionAlternativesDisplay = ({emotionAlternatives}) => {

    const [emotionData, setEmotionData] = useState([])

    useEffect(() => {
        const out = []
        for (const emotionId of emotionAlternatives) {
            out.push({
                "emotion": getEmotionFromId(emotionId),
                "emotion_id": emotionId
            })
        }
        setEmotionData(out)

    }, [emotionAlternatives]);

    const columns = [
        {
            title: 'Emotion',
            dataIndex: 'emotion',
            key: 'emotion',
        },
        {
            title: 'Emotion Id',
            dataIndex: 'emotion_id',
            key: 'emotion_id',
        }
    ]

    return <Collapse>
        <Collapse.Panel key={2} header={"Emotion Options"}>
            <Table dataSource={emotionData} rowKey="emotion_id" columns={columns} size="small"/>
        </Collapse.Panel>
    </Collapse>;
};
export default EmotionAlternativesDisplay;