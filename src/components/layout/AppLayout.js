import React, {useState} from 'react';
import {
    CopyOutlined, DragOutlined,

} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Link, Route, Routes} from "react-router-dom";
import CreateSurvey from "../create/CreateSurvey";
import {SurveyTable} from "../create/SurveyTable";
import SurveyDetails from "../survey/SurveyDetails";
import {useSurveyData} from "../../contexts/SurveyDataProvider";
import {Visualizations} from "../visualize/Visualizations";

const {Header, Content, Footer, Sider} = Layout;


export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {switchApiType} = useSurveyData();

    // Function to handle API switch based on menu item
    const handleSwitchApi = (apiType) => {
        if (apiType) {
            switchApiType(apiType);
        }
    };

    function getItem(label, key, icon, children, path, apiType) {
        return {
            key,
            icon,
            children,
            label: path ? <Link to={path}
                                onClick={() => handleSwitchApi(apiType)}

            >{label}</Link> : label,
        };
    }

    const createMenuItem = (title, key, path, apiType) =>
        getItem(title, key, null, null, path, apiType);

    const createMenuItems = (apiType) => [
        createMenuItem('Create', `${apiType}-create`, '/protected/create', apiType),
        createMenuItem('Survey Overview', `${apiType}-overview`, '/protected/overview', apiType),
        createMenuItem('Items', `${apiType}-items`, 'Items', apiType),
    ];

    const createSubMenu = (title, key, icon, items) => getItem(title, key, icon, items);

// Now generate menu items for each category using the function
    const categoriesItems = createMenuItems('categories');
    const scalesItems = createMenuItems('scales');

// Final menu structure
    const items = [
        createSubMenu('Categories', 'sub1', <CopyOutlined/>, categoriesItems),
        createSubMenu('Scales', 'sub2', <DragOutlined/>, scalesItems),
    ];

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark"
                      defaultSelectedKeys={['1']}
                      mode="inline"
                      items={items}
                >
                </Menu>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer,}}
                />
                <Content style={{margin: '0 16px',}}>
                    <Routes>
                        <Route path="/" element={<SurveyTable/>}/>
                        <Route path="/survey/:surveyId" element={<SurveyDetails/>}/>
                        <Route path="/create" element={<CreateSurvey/>}/>
                        <Route path="/overview" element={<SurveyTable/>}/>
                        <Route path="/items" element={<Visualizations/>}/>
                    </Routes>

                </Content>
                <Footer style={{textAlign: 'center',}}>
                </Footer>
            </Layout>
        </Layout>
    );
};
