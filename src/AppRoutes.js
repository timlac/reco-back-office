import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';

import {UserCoordinator} from "./components/create/UserCoordinator";
import SurveyDetails from "./components/survey/SurveyDetails";


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
        <Route path="/protected/*" element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/" />} />
      {/* ... other routes ... */}
    </Routes>
  );
};


// Create a nested route structure for the protected routes
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <UserCoordinator />
          </div>
        }
      />
      {/* Protected Survey Route */}
      <Route
        path="/survey/:surveyId"
        element={
          <div>
            <SurveyDetails />
          </div>
        }
      />
      {/* ... other protected routes ... */}
    </Routes>
  );
};

export default AppRoutes;