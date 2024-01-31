import {Route, Link, Routes} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {SurveyTable} from "../surveys/display/SurveyTable";
import CreateSurvey from "../surveys/create/CreateSurvey";
import {Visualizations} from "../surveys/visualize/Visualizations";
import React from "react";
import SurveyDetails from "../surveys/display/SurveyDetails";

const {
    Header,
    Content,
} = Layout;


const SurveyLayout = () => {


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
                        <Route path=":surveyId" element={<SurveyDetails/>}/>
                        <Route path="create-survey" element={<CreateSurvey/>}/>
                        <Route path="statistics" element={<Visualizations/>}/>
                    </Routes>
                </div>
            </Content>
        </Layout>
    )
}

export default SurveyLayout