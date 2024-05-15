import {Route, Link, Routes} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import CreateProject from "../projects/CreateProject";
import ViewProjects from "../projects/ViewProjects";
import SurveyLayout from "./SurveyLayout";
import {SurveyDataProvider} from "../../contexts/SurveyDataProvider";

const {Header, Content} = Layout;


const ProjectLayout = () => {
    return (
        <Layout>
            <Header style={{height: '40px', lineHeight: '40px', padding: '0 0px'}}
            >
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="">My Projects</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="create-project">Create Project</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="site-layout-content">
                    <Routes>
                        <Route exact path="" element={<ViewProjects/>}/>
                        <Route path="create-project" element={<CreateProject/>}/>
                        <Route path=":projectName/*" element={
                            <SurveyDataProvider>
                                <SurveyLayout/>
                            </SurveyDataProvider>
                        }/>
                    </Routes>
                </div>
            </Content>
        </Layout>
    )
}

export default ProjectLayout