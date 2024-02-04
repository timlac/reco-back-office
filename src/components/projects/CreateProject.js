// CreateProject.js
import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import CreateProjectForm from './CreateProjectForm';
import {message} from "antd"; // Import the extracted form component

const CreateProject = () => {
    const [folderDict, setFolderDict] = useState([]);

    useEffect(() => {
        api.get("s3_folders")
            .then(response => setFolderDict(response.data))
            .catch(error => console.error('Error fetching S3 folders:', error));
    }, []);


    const onFormFinish = (payload) => {

        console.log(payload)

        api.post("/projects", payload)
            .then(response => {
                console.log(response)
                message.success("Survey successfully created!")
            })
            .catch(error => {
                console.log(error)
                message.error(`Error creating the survey: ${error.message}`);
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
