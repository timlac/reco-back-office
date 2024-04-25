import React from 'react';
import {Form, Input, Button, Radio, DatePicker, Tooltip, Switch} from 'antd';
import {ALL, NEGATIVE_VALENCE, POSITIVE_VALENCE} from "../../../config";
import moment from "moment";

const CreateSurveyForm = ({createSurvey, isLoading}) => {
    const initialDateOfBirth = moment().subtract(25, 'years');

    const onFinish = (values) => {

        const dateString = values["dob"] ? values["dob"].format('YYYY-MM-DD') : null;
        values["dateString"] = dateString

        createSurvey(values)
    };

    return (
        <Form
            initialValues={{
                user_id: 'default', // Set default value for "User Id"
                // sex: 'male',                 // Set default value for "Sex"
                // dob: initialDateOfBirth,                   // Set default value for "Date of Birth"
                valence: ALL,
                consent: false
            }}
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

            name="basicForm"
            onFinish={onFinish}
        >
            <Form.Item
                label="User Id"
                name="user_id"
                rules={[{required: true, message: 'Please input user id'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Sex"
                name="sex"
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
            >
                <DatePicker/>
            </Form.Item>

            <Form.Item
                label="Consent"
                name="consent"
            >
                <Switch>

                </Switch>
            </Form.Item>

            <Form.Item
                label="Valence"
                name="valence"
                rules={[{required: true, message: 'Please select valence!'}]}
            >
                <Radio.Group>
                    <Tooltip></Tooltip>
                    <Tooltip key={ALL} title={"All Emotions"}>
                        <Radio value={ALL}>All</Radio>
                    </Tooltip>
                    <Tooltip key={POSITIVE_VALENCE} title={"Positive Emotions"}>
                        <Radio value={POSITIVE_VALENCE}>Positive</Radio>
                    </Tooltip>
                    <Tooltip key={NEGATIVE_VALENCE} title={"Negative Emotions"}>
                        <Radio value={NEGATIVE_VALENCE}>Negative</Radio>
                    </Tooltip>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 5, // This offset should match labelCol span
                    span: 14,
                }}>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateSurveyForm;
