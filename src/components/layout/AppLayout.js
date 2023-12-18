import React, {useState} from 'react';
import {
    CopyOutlined, DragOutlined,

} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import CreateSurvey from "../create/CreateSurvey";
import {SurveyTable} from "../create/SurveyTable";
import SurveyDetails from "../survey/SurveyDetails";
import ItemHistogram from "../visualize/ItemHistogram";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, path) {
    return {
        key,
        icon,
        children,
        label: path ? <Link to={path}>{label}</Link> : label,
    };
}

const items = [
    getItem('Categories', 'sub1', <CopyOutlined/>, [
        getItem('Create', '1', null, null, "/protected/create"),
        getItem('Survey Overview', '2', null, null, "/protected/overview"),
        getItem('Items', '3', null, null, "items"),
    ]),
    getItem('Scales', 'sub2', <DragOutlined/>, [
        getItem('Create', '4'),
        getItem('Survey Overview', '5'),
        getItem("Other", '6')
    ]),
];
export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
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
                    <Menu.Item key="Test">
                        <Link to={"/protected/create"}>Test</Link>

                    </Menu.Item>
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
