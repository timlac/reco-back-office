import React, {useState} from 'react';
import {
    CopyOutlined, DragOutlined,

} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Link, Route, Routes} from "react-router-dom";
import CreateSurvey from "../create/CreateSurvey";
import {SurveyTable} from "../create/SurveyTable";
import SurveyDetails from "../survey/SurveyDetails";
import ItemHistogram from "../visualize/ItemHistogram";
import {useSurveyData} from "../../contexts/SurveyDataProvider";

const {Header, Content, Footer, Sider} = Layout;


const createMenuItem = (title, key, path, apiType) => getItem(title, key, null, null, path, apiType);

const createSubMenu = (title, key, icon, items) => getItem(title, key, icon, items);

// Menu items for 'Categories'
const categoriesItems = [
    createMenuItem('Create', '1', '/protected/create', 'categories'),
    createMenuItem('Survey Overview', '2', '/protected/overview', 'categories'),
    createMenuItem('Items', '3', 'Items', 'categories'),
];

// Menu items for 'Scales'
const scalesItems = [
    createMenuItem('Create', '4', '/protected/create', 'scales'),
    createMenuItem('Survey Overview', '5', '/protected/overview', 'scales'),
    createMenuItem('Items', '6', 'Items', 'scales'),
];

// Final menu structure
const items = [
    createSubMenu('Categories', 'sub1', <CopyOutlined />, categoriesItems),
    createSubMenu('Scales', 'sub2', <DragOutlined />, scalesItems),
];



function getItem(label, key, icon, children, path, apiType) {
    return {
        key,
        icon,
        children,
        label: path ? <Link to={path}
            onClick={() => handleMenuClick(apiType)}

        >{label}</Link> : label,
    };
}

const items = [
    getItem('Categories', 'sub1', <CopyOutlined/>, [
        getItem('Create', '1', null, null, "/protected/create", 'categories'),
        getItem('Survey Overview', '2', null, null, "/protected/overview", 'categories'),
        getItem('Items', '3', null, null, "Items", 'categories'),
    ]),
    getItem('Scales', 'sub2', <DragOutlined/>, [
        getItem('Create', '4', null, null, "/protected/create", "scales"),
        getItem('Survey Overview', '5', null, null, "/protected/overview", "scales"),
        getItem("Items", '6', null, null, "Items", "scales")
    ]),
];
export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { switchApiKeyword } = useSurveyData();

    // Function to handle API switch based on menu item
    const handleMenuClick = (apiType) => {
        if (apiType) {
            switchApiKeyword(apiType);
        }
    };

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
                        <Route path="/items" element={<ItemHistogram/>}/>
                    </Routes>

                </Content>
                <Footer style={{textAlign: 'center',}}>
                </Footer>
            </Layout>
        </Layout>
    );
};
