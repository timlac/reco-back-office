import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import {Button, Form, Input, Radio, Select, Slider} from 'antd';
import {surveyTypes} from "../../config";
import {capitalizeFirstLetter} from "../../services/utils";

const CreateProject = () => {
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
                })
                .catch(error => {
                    console.error('Error fetching S3 folders:', error);
                });
        }, []);

        const onFinish = (values) => {
            console.log(values)

            console.log(values)

            const body = {
                "s3_data_folder": selectedFolder,
                ...values
            }

            api.post("/projects", body)
                .then(response => console.log(response))
                .catch(error => console.log(error))
            // Handle the selected folder value
        };

        const handleFolderChange = (e) => {

            const folder = e.target.value
            setSelectedFolder(folder); // Update the selected folder state

            const newNumberOfEmotions = folderDict[folder]["emotion_ids"].length
            setNumberOfEmotions(newNumberOfEmotions)
            form.setFieldsValue({
                emotions_per_survey: newNumberOfEmotions,
            });

            console.log(folderDict[folder]["emotion_ids"].length)

            console.log(folderDict[folder]["objects"].length)
        };

        // Map surveyTypes to surveyTypeOptions format
        const surveyTypeOptions = surveyTypes.map(surveyType => ({
            value: surveyType, // Use the survey surveyType as the value
            label: capitalizeFirstLetter(surveyType) // Capitalize the first letter for the label
        }));

        return (
            <div>
                <h1>Create New Project</h1>

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

                    initialValues={{
                        survey_type: surveyTypeOptions[0].value,  // Default value for survey_type
                        emotions_per_survey: numberOfEmotions  // Default value for numOfEm
                    }}
                    form={form} onFinish={onFinish}>

                    < Form.Item name="s3_folder" label="Select a data source">
                        < Radio.Group onChange={handleFolderChange} value={selectedFolder}>
                            {
                                Object.keys(folderDict).map((folder, index) => (
                                    <Radio key={index} value={folder}>
                                        {folder}
                                    </Radio>
                                ))
                            }
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="project_name" label="Project Name"
                               rules={[{required: true, message: 'Please enter the survey name!'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="survey_type" label="Survey Type">
                        <Select
                            style={{width: 200}} // Adjust width as needed
                            options={surveyTypeOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        label="No. emotions per survey"
                        name="emotions_per_survey"
                    >
                        <Slider
                            min={1}
                            max={numberOfEmotions} // Controlled by state, which is updated on folder change
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
            </div>
        )

    }
;

export default CreateProject;
