import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import {setNewPassword, signIn} from "../../libs/CognitoConstruct";
import {Button, Form, Input} from "antd";

import backgroundImage from '../../images/Timovia2.png';

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',  // Set the width to 100% of the viewport width
    height: '100vh', // Set the height to 100% of the viewport height
};


const LoginForm = () => {

    const [newPasswordRequired, setNewPasswordRequired] = useState(false);
    const [error, setError] = useState("")

    const navigate = useNavigate();
    const auth = useAuth();


    const onFinishNewPassWord = async (values) => {
        setNewPassword(values.newPassword, setNewPasswordRequired)
    }

    const onFinish = async (values) => {
        const {username, password} = values;
        try {
            await signIn(username, password, setNewPasswordRequired)
            auth.login(username); // Update the login context state
            navigate('/protected/categories'); // Navigate to the protected route
        } catch (err) {
            setError(err.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={backgroundStyle}>


            <div style={{padding: '40px'}}>

                <div>
                    {!newPasswordRequired ? (
                        <div>
                            <h1>Welcome to Timovia</h1>
                            <h3>Please log in:</h3>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    ) : (
                        <div>
                            <h1>Welcome to Timovia</h1>
                            <h3>Please choose a new password to continue</h3>
                            <Form
                                name="newPassword"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinishNewPassWord}
                                // onFinishFailed={onFinishNewPassWordFailed}
                            >
                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your new password!',
                                        },
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </div>
                {error && <p>{error}</p>}
            </div>

        </div>
    );
}

export default LoginForm