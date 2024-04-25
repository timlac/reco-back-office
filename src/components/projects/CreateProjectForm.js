// CreateProjectForm.js
import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Radio, Select, Slider, Switch} from 'antd';
import {InputNumber} from 'antd';

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


const CreateProjectForm = ({folderDict, onFormFinish, replyTemplates, instructionTemplates}) => {
    const [form] = Form.useForm();
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [numberOfEmotions, setNumberOfEmotions] = useState(44);
    const [numberOfSamples, setNumberOfSamples] = useState(10000);
    const [balancedSamplingEnabled, setBalancedSamplingEnabled] = useState(false);

    console.log(replyTemplates)
    console.log(instructionTemplates)

    useEffect(() => {
        // This effect updates the form's samples_per_survey field whenever numberOfSamples changes
        form.setFieldsValue({samples_per_survey: numberOfSamples});
    }, [numberOfSamples, form]);

    const replyFormatOptions = replyTemplates.length > 0 ? replyTemplates.map(item => ({
        value: item.template_name,
        label: capitalizeFirstLetter(item.template_name)
    })) : [];

    const InstructionTemplateOptions = instructionTemplates.length > 0 ? instructionTemplates.map(item => ({
        value: item.template_name,
        label: capitalizeFirstLetter(item.template_name)
    })) : [];

    const handleFolderChange = (e) => {
        const folder = e.target.value;
        setSelectedFolder(folder);
        const newNumberOfEmotions = getEmotionsCount(folderDict, folder)

        setNumberOfEmotions(newNumberOfEmotions);
        setNumberOfSamples(getSamplesCount(folderDict, folder));

        form.setFieldsValue({emotions_per_survey: newNumberOfEmotions});

    };

    const handleBalancedSamplingChange = (checked) => {
        setBalancedSamplingEnabled(checked);
        // Optional: Reset sliders if needed...
    };

    const handleNumberOfSamplesChange = (newValue) => {
        form.setFieldsValue({samples_per_survey: newValue});
    };


    // Update onFinish to construct the body and call onFormFinish
    const onFinish = (values) => {
        console.log(values.samples_per_survey)


        const payload = {
            "s3_folder": selectedFolder,
            "s3_experiment_objects": getExperimentObjects(folderDict, selectedFolder),
            "s3_intro_objects": getIntroObjects(folderDict, selectedFolder),
            "balanced_sampling_enabled": balancedSamplingEnabled,
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
              initialValues={{
                  // survey_type: replyFormatOptions[0].value,
                  emotions_per_survey: numberOfEmotions,
                  samples_per_survey: numberOfSamples,
                  days_to_deactivation: null
              }}
              onFinish={onFinish}
        >
            <Form.Item name="s3_folder" label="Select a data source" rules={[{required: true}]}>
                <Radio.Group onChange={handleFolderChange} value={selectedFolder}>
                    {Object.keys(folderDict).map((folder, index) => (
                        <Radio key={index} value={folder}>{folder}</Radio>
                    ))}
                </Radio.Group>
            </Form.Item>

            <Form.Item name="project_name" label="Project Name"
                       rules={[{required: true}]}>
                <Input placeholder="Enter project name"
                />
            </Form.Item>

            <Form.Item name="reply_format_name" label="Reply Template" rules={[{required: true}]}>
                <Select style={{width: 200}} options={replyFormatOptions}/>
            </Form.Item>

            <Form.Item name="instruction_template_name" label="Instruction Template" rules={[{required: true}]}>
                <Select style={{width: 200}} options={InstructionTemplateOptions}/>
            </Form.Item>

            <Form.Item name="days_to_deactivation" label="Days to Deactivation">
                <InputNumber
                    min={1}
                    max={365}
                    placeholder="Enter a number, leave blank for infinite"
                    style={{width: '100%'}} // Optional: Adjust width as needed
                />
            </Form.Item>

            <Form.Item label="No. samples per survey" name="samples_per_survey">
                <NumberOfSamplesSlider numberOfSamples={numberOfSamples}
                                       onValueChange={handleNumberOfSamplesChange}/>
            </Form.Item>

            <Form.Item label="Enable Balanced Sampling" valuePropName="checked"
                       tooltip={<p>Balanced Sampling means that
                           survey items will have an equal distribution of emotion ids, not applicable
                           for items with mixed emotions</p>}>

                <Switch onChange={handleBalancedSamplingChange}/>
            </Form.Item>

            <Form.Item label="No. emotions per survey" name="emotions_per_survey">
                <Slider disabled={!balancedSamplingEnabled} min={1} max={numberOfEmotions}
                        marks={{1: 1, [numberOfEmotions]: numberOfEmotions}}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProjectForm;
