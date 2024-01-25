import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';

import {AppLayout} from "./components/layout/AppLayout";
import React from "react";
import {SurveyDataProvider} from "./contexts/SurveyDataProvider";
import CreateNewSurveyComponent from "./components/create/CreateNewSurveyComponent";


const AppRoutes = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/protected/:surveyType/*" element={isAuthenticated ? <ProtectedRoutes/> : <Navigate to="/"/>}/>
            <Route path="/protected/create_new_survey" element={isAuthenticated ? <ProtectedRoutesNoProvider/> : <Navigate to="/"/>}/>
        </Routes>
    );
};


const ProtectedRoutesNoProvider = () => {
    // Need some kind of higher AppLayout component here
    return <CreateNewSurveyComponent/>
}

// Create a nested route structure for the protected routes
const ProtectedRoutes = () => {
    return (
        <SurveyDataProvider>
            <AppLayout/>
        </SurveyDataProvider>
    );
};

export default AppRoutes;