import React, {useEffect, useState} from 'react';
import {List, Card} from 'antd';
import {api} from "../../services/api";
import {Link} from "react-router-dom";
import {CheckCircleOutlined, CloseOutlined} from "@ant-design/icons"; // Assuming you're using axios for API calls

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Replace 'your-api-endpoint' with the actual endpoint to fetch projects
        api.get('projects')
            .then(response => {
                // Assume the response contains an array of projects
                setProjects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the projects:', error);
            });
    }, []);

    return (
        <div>
            <h1>My Projects</h1>
            <List
                grid={{gutter: 16, column: 4}}
                dataSource={projects}
                renderItem={project => (
                    <List.Item>
                        <Link to={`${project.project_name}`}>
                            <Card title={project.project_name}>

                                <p>Survey Type: {project.survey_type}</p>
                                <p>Samples per survey: {project.samples_per_survey}</p>
                                <p>Balanced Sampling: {project.balanced_sampling_enabled ?
                                    <CheckCircleOutlined /> : <CloseOutlined /> }</p>
                                {project.balanced_sampling_enabled &&
                                    <p>Emotions per survey: {project.emotions_per_survey}</p>
                                }

                            </Card>
                        </Link>

                    </List.Item>
                )}
            />
        </div>
    );
}

export default ViewProjects;
