import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';

import {AppLayout} from "./components/layout/AppLayout";
import React from "react";
import {SurveyDataProvider} from "./contexts/SurveyDataProvider";


const AppRoutes = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/protected/:surveyType/*" element={isAuthenticated ? <ProtectedRoutes/> : <Navigate to="/"/>}/>
            {/* ... other routes ... */}
        </Routes>
    );
};


// Create a nested route structure for the protected routes
const ProtectedRoutes = () => {
    return (
        <SurveyDataProvider>
            <AppLayout/>
        </SurveyDataProvider>
    );
};

export default AppRoutes;