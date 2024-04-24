// CreateProject.js
import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import CreateProjectForm from './CreateProjectForm';
import {message} from "antd";


const CreateProject = () => {


    const [folderDict, setFolderDict] = useState([]);
    const [replyTemplates, setReplyTemplates] = useState([]);
    const [instructionTemplates, setInstructionTemplates] = useState([]);

    useEffect(() => {
        api.get("s3_folders")
            .then(response => setFolderDict(response.data))
            .catch(error => console.error('Error fetching S3 folders:', error));

        // Fetch reply templates
        api.get('/templates/reply_format')
            .then(response => setReplyTemplates(response.data))
            .catch(error => console.error('Error fetching reply templates:', error));

        // Fetch instruction templates
        api.get('/templates/instruction')
            .then(response => setInstructionTemplates(response.data))
            .catch(error => console.error('Error fetching instruction templates:', error));

    }, []);


    const onFormFinish = (payload) => {

        console.log(payload)

        // Find the selected reply template based on template_name
        const replyFormat = replyTemplates.find(item => item.template_name === payload.reply_format_name);

        // Find the selected instruction template based on template_name
        const instructions = instructionTemplates.find(item => item.template_name === payload.instruction_template_name);

        payload = {
            reply_format: replyFormat,
            instructions: instructions,
            ...payload
        }

        api.post("/projects", payload)
            .then(response => {
                console.log(response)
                message.success("Project successfully created!")
            })
            .catch(error => {
                console.log(error)
                message.error(`Error creating the project: ${error.message}`);
            })
    };

    return (
        <div>
            <h1>Create New Project</h1>
            <CreateProjectForm
                folderDict={folderDict}
                onFormFinish={onFormFinish}
                replyTemplates={replyTemplates} // Pass replyTemplates as props
                instructionTemplates={instructionTemplates}
            />
        </div>
    );
};

export default CreateProject;
