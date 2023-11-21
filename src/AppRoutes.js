import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import useAuth from './contexts/AuthContext';
import LoginForm from './components/login/LoginForm';
import LogoutButton from "./components/login/LogOutButton";


import api from "./services/api";
import CreateUser from "./components/create/CreateUser";
import {UserCoordinator} from "./components/create/UserCoordinator";


const ProtectedPage = () => {


    const [data, setData] = useState(null);


    const fetchData = async () => {
        try {
            const response = await api.get("");
            console.log(response.data["message"])
            setData(response.data["message"]);
        } catch (error) {
            console.error('API call failed', error);
        }
    };


    useEffect( () => {
        fetchData().catch(error => {
            console.error("Error fetching data: ", error)
        });
    }, [])


    return <div>
        <LogoutButton/>

        {data && <div>{JSON.stringify(data)}</div>}
        Welcome, authenticated user!</div>

};

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