// CreateProject.js
import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import CreateProjectForm from './CreateProjectForm'; // Import the extracted form component

const CreateProject = () => {
    const [folderDict, setFolderDict] = useState([]);

    useEffect(() => {
        api.get("s3_folders")
            .then(response => setFolderDict(response.data))
            .catch(error => console.error('Error fetching S3 folders:', error));
    }, []);


    const onFormFinish = (payload) => {

        // console.log(folderDict[selectedFolder]["objects"])
        api.post("/projects", payload)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        // Handle the selected folder value
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
