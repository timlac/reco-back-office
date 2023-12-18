import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';

import SurveyDetails from "./components/survey/SurveyDetails";
import {AppLayout} from "./components/layout/AppLayout";
import {UserDataProvider} from "./contexts/UserDataProvider";
import CreateSurvey from "./components/create/CreateSurvey";
import {SurveyTable} from "./components/create/SurveyTable";
import ItemHistogram from "./components/visualize/ItemHistogram";
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
        <UserDataProvider>
            <AppLayout/>
        </UserDataProvider>
    );
};

export default AppRoutes;