import {Route, Routes} from 'react-router-dom';
import LoginForm from './components/login/LoginForm';

import React from "react";
import ProjectLayout from "./components/layout/ProjectLayout";
import ProtectedRoute from "./components/login/ProtectedRoute";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/protected/projects/*" element={
                <ProtectedRoute>
                    <ProjectLayout/>
                </ProtectedRoute>
            }/>
        </Routes>
    );
};

export default AppRoutes;