import React, {useState} from 'react';
import {Form, Input, Button, Radio, DatePicker} from 'antd';
import {NEGATIVE_VALENCE, POSITIVE_VALENCE} from "../../config";
import {generateHash} from "../../services/generateHash";

const BasicForm = ({createUser}) => {

    const [surveyId, setSurveyId] = useState('');


    const onFinish = (values) => {

        values.surveyId = surveyId

        console.log('Form Values:', values);
        console.log(values["dob"])

        const dateString = values["dob"] ? values["dob"].format('YYYY-MM-DD') : null;
        console.log('Date of Birth:', dateString);

        values["dateString"] = dateString

        console.log(values)

        // createUser(values)
    };

    const generateSurveyId = async () => {

        const hash = await generateHash()

        if (hash) {
            setSurveyId(hash)
        }
    }


    return (
        <Form
            initialValues={{ surveyId: surveyId }} // Set the initial value for the surveyId field

            size={"small"}
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 14
            }}
            layout="horizontal"
            style={{
                maxWidth: 600,
            }}

            name="basicForm"
            onFinish={onFinish}
        >
            <Form.Item
                label="Survey Id"
            >
                <Input name="surveyId" value={surveyId} readOnly></Input>

                <Button type={"default"} onClick={generateSurveyId}>
                    Generate Unique Survey Id
                </Button>
            </Form.Item>

            <Form.Item
                label="User Id"
                name="email"
                rules={[{required: true, message: 'Please input user id'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Sex"
                name="sex"
                rules={[{required: true, message: 'Please select your gender!'}]}
            >
                <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{required: true, message: 'Please select date of birth!'}]}
            >
                <DatePicker/>
            </Form.Item>

            <Form.Item
                label="Valence"
                name="valence"
                rules={[{required: true, message: 'Please select a valence!'}]}
            >
                <Radio.Group>
                    <Radio value="All">All</Radio>
                    <Radio value={POSITIVE_VALENCE}>Pos</Radio>
                    <Radio value={NEGATIVE_VALENCE}>Neg</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5, // This offset should match labelCol span
                    span: 14,
                }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BasicForm;
