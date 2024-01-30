import {Route, Link, Routes, useLocation} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {SurveyTable} from "../surveys/display/SurveyTable";
import CreateSurvey from "../surveys/create/CreateSurvey";
import {Visualizations} from "../surveys/visualize/Visualizations";
import React, {useEffect, useState} from "react";

const {
    Header,
    Content,
} = Layout;


const SurveyLayout = () => {
    const location = useLocation();
    const [project, setProject] = useState(location.state?.project);

    useEffect(() => {
        // Check if there's a project in the location state and update only if it's different
        // This helps retain the project state across navigation changes within SurveyLayout
        if (location.state?.project && location.state.project !== project) {
            setProject(location.state.project);
        }
    }, [location, project]);


    return (
        <Layout className="surveyLayout">
            <Header
            >
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="">Survey Overview</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="create-survey">Create Survey</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="statistics">Statistics</Link></Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="site-layout-content">
                    <Routes>
                        <Route exact path="" element={<SurveyTable/>}/>
                        <Route path="create-survey" element={<CreateSurvey project={project}/>}/>
                        <Route path="statistics" element={<Visualizations/>}/>
                    </Routes>
                </div>
            </Content>
        </Layout>
    )
}

export default SurveyLayout