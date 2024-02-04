// CreateProject.js
import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import CreateProjectForm from './CreateProjectForm';
import {message} from "antd";
import {replyTemplates} from "../../templates/replyTemplates";
import {instructionTemplates} from "../../templates/intructionTemplates";

const CreateProject = () => {
    const [folderDict, setFolderDict] = useState([]);

    useEffect(() => {
        api.get("s3_folders")
            .then(response => setFolderDict(response.data))
            .catch(error => console.error('Error fetching S3 folders:', error));
    }, []);


    const onFormFinish = (payload) => {

        console.log(payload)

        const templateName = payload.survey_type

        const replyFormat = replyTemplates[templateName]
        const instructions = instructionTemplates[templateName]

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
                onFormFinish = {onFormFinish}
            />
        </div>
    );
};

export default CreateProject;
