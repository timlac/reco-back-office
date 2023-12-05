import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';

import {UserCoordinator} from "./components/create/UserCoordinator";


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route
        path="/protected"
        element={
          isAuthenticated
            ? <div>
              <UserCoordinator/>
              </div>
            : <Navigate to="/" />
        }
      />
      {/* ... other routes ... */}
    </Routes>
  );
};

export default AppRoutes;