import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import {Button, Form, Input, Radio, Slider} from 'antd';

const CreateNewSurveyComponent = () => {
    const [folderDict, setFolderDict] = useState([]);
    // const [numberOfEmotions, setNumberOfEmotions] = useState(44)
    const [form] = Form.useForm();

    const [numberOfEmotions, setNumberOfEmotions] = useState(44)

    const [selectedFolder, setSelectedFolder] = useState(null); // Initialize with null

    useEffect(() => {
        api.get("s3_folders")
            .then(response => {
                console.log(response.data)
                setFolderDict(response.data); // Assuming data is in response.data
                // setNumberOfEmotions(response.data.emotion_ids.length)

                // console.log(numberOfEmotions)
                // console.log(response.data.emotion_ids.length)

            })
            .catch(error => {
                console.error('Error fetching S3 folders:', error);
            });
    }, []);

    const onFinish = (values) => {
        console.log(values)

        api.post("")

        // Handle the selected folder value
    };

    const handleFolderChange = (e) => {
        const folder = e.target.value

        setSelectedFolder(folder); // Update the selected folder state
        setNumberOfEmotions(folderDict[folder]["emotion_ids"].length)

        console.log(folderDict[folder]["emotion_ids"].length)
    };

    return (
        <Form
            size={"small"}
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 14
            }}
            layout="horizontal"
            style={{
                maxWidth: 800,
            }}
            form={form} onFinish={onFinish}>

            <Form.Item name="s3_folder" label="Select a data source">
                <Radio.Group onChange={handleFolderChange} value={selectedFolder}>
                    {Object.keys(folderDict).map((folder, index) => (
                        <Radio key={index} value={folder}>
                            {folder}
                        </Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
            <Form.Item name="survey_name" label="Survey Name"
                       rules={[{required: true, message: 'Please enter the survey name!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="survey_type" label="Survey Type"
                       rules={[{required: true, message: 'Please enter the survey type!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="No. Emotion Alternatives"
                name="numOfEmotionAlternatives"
            >
                <Slider defaultValue={1}
                        min={1}
                        max={numberOfEmotions}
                    marks={{
                        1: 1,
                        [numberOfEmotions]: numberOfEmotions
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateNewSurveyComponent;
