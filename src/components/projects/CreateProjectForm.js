// CreateProjectForm.js
import React, {useState} from 'react';
import {Button, Form, Input, Radio, Select, Slider, Switch} from 'antd';
import {surveyTypes} from "../../config";
import {capitalizeFirstLetter} from "../../services/utils";
import NumberOfSamplesSlider from "./NumberOfSamplesSlider";

const getEmotionsCount = (folderDict, folder) => {
    return folderDict[folder]["experiment_metadata"]?.emotion_ids?.length || 0;
};

const getSamplesCount = (folderDict, folder) => {
    return folderDict[folder]["experiment"]?.length || 0;
};

const getExperimentObjects = (folderDict, folder) => {
    return folderDict[folder]["experiment"] || [];
};

const getIntroObjects = (folderDict, folder) => {
    return folderDict[folder]["intro"] || [];
};


const CreateProjectForm = ({ folderDict, onFormFinish }) => {
    const [form] = Form.useForm();
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [numberOfEmotions, setNumberOfEmotions] = useState(44);
    const [numberOfSamples, setNumberOfSamples] = useState(10000);
    const [emotionSamplingEnabled, setEmotionSamplingEnabled] = useState(false);

    const surveyTypeOptions = surveyTypes.map(surveyType => ({
        value: surveyType,
        label: capitalizeFirstLetter(surveyType)
    }));

    const handleFolderChange = (e) => {
        const folder = e.target.value;
        setSelectedFolder(folder);
        const newNumberOfEmotions = getEmotionsCount(folderDict, folder)

        setNumberOfEmotions(newNumberOfEmotions);
        setNumberOfSamples(getSamplesCount(folderDict, folder));

        form.setFieldsValue({ emotions_per_survey: newNumberOfEmotions });

    };

    const handleEmotionSamplingChange = (checked) => {
        setEmotionSamplingEnabled(checked);
        // Optional: Reset sliders if needed...
    };

    const handleNumberOfSamplesChange = (newValue) => {
        form.setFieldsValue({ samples_per_survey: newValue });
    };


    // Update onFinish to construct the body and call onFormFinish
    const onFinish = (values) => {
        console.log(values.emotions_per_survey)
        console.log(numberOfEmotions)

        const payload = {
            "s3_folder": selectedFolder,
            "s3_experiment_objects": getExperimentObjects(folderDict, selectedFolder),
            "s3_intro_objects": getIntroObjects(folderDict, selectedFolder),
            "emotion_sampling_enabled": emotionSamplingEnabled,
            ...values
        };

        onFormFinish(payload); // Call the passed onFinish function with the constructed body
    };

    return (
        <Form form={form}
            size="small"
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            style={{maxWidth: 800}}
            initialValues={{survey_type: surveyTypeOptions[0].value, emotions_per_survey: numberOfEmotions}}
            onFinish={onFinish}
        >
            <Form.Item name="s3_folder" label="Select a data source">
                <Radio.Group onChange={handleFolderChange} value={selectedFolder}>
                    {Object.keys(folderDict).map((folder, index) => (
                        <Radio key={index} value={folder}>{folder}</Radio>
                    ))}
                </Radio.Group>
            </Form.Item>

            <Form.Item name="project_name" label="Project Name"
                       rules={[{required: true, message: 'Please enter the survey name!'}]}>
                <Input/>
            </Form.Item>

            <Form.Item name="survey_type" label="Survey Type">
                <Select style={{width: 200}} options={surveyTypeOptions}/>
            </Form.Item>

          <Form.Item label="Enable Emotion Sampling" valuePropName="checked">
                <Switch onChange={handleEmotionSamplingChange} />
            </Form.Item>

            <Form.Item label="No. emotions per survey" name="emotions_per_survey">
                <Slider disabled={!emotionSamplingEnabled} min={1} max={numberOfEmotions}
                        marks={{1: 1, [numberOfEmotions]: numberOfEmotions}}/>
            </Form.Item>

            <Form.Item label="No. samples per survey" name="samples_per_survey">
                <NumberOfSamplesSlider emotionSamplingEnabled={emotionSamplingEnabled} numberOfSamples={numberOfSamples}
                                       onValueChange={handleNumberOfSamplesChange}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProjectForm;
