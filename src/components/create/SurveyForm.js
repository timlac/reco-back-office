import React from 'react';
import {Form, Input, Button, Radio, DatePicker} from 'antd';
import {NEGATIVE_VALENCE, POSITIVE_VALENCE} from "../../config";
import moment from "moment";

const SurveyForm = ({createSurvey, isLoading}) => {
    const initialDateOfBirth = moment().subtract(25, 'years');

    const onFinish = (values) => {

        const dateString = values["dob"] ? values["dob"].format('YYYY-MM-DD') : null;
        values["dateString"] = dateString

        createSurvey(values)
    };


    return (
        <Form
            initialValues={{
                email: 'default', // Set default value for "User Id"
                sex: 'male',                 // Set default value for "Sex"
                dob: initialDateOfBirth,                   // Set default value for "Date of Birth"
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
                maxWidth: 600,
            }}

            name="basicForm"
            onFinish={onFinish}
        >
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
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SurveyForm;
