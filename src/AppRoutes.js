import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';

import {AppLayout} from "./components/layout/AppLayout";
import {SurveyDataProvider} from "./contexts/SurveyDataProvider";
import React from "react";


const AppRoutes = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/protected/*" element={isAuthenticated ? <ProtectedRoutes/> : <Navigate to="/"/>}/>
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