import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import {api} from "../../services/api"; // Assuming you're using axios for API calls

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
                grid={{ gutter: 16, column: 4 }}
                dataSource={projects}
                renderItem={project => (
                    <List.Item>
                        <Card title={project.project_name}> {/* Use project.name or any relevant property */}
                            {/* Display more project details here */}
                            <p>Survey Type: {project.survey_type}</p>
                            <p>Emotions per survey: {project.emotions_per_survey}</p>
                            {/* Add more project information as needed */}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default ViewProjects;
