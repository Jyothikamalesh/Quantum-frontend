import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [usertype, setusertype] = useState(localStorage.getItem('is_superuser'));

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      console.log(response.data.is_superuser);
      setusertype(response.data.is_superuser);
      localStorage.setItem('is_superuser', response.data.is_superuser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to set the access token and store it in local storage
  const login = (token) => {

    setAccessToken(token);
    fetchUserData(token);
    localStorage.setItem('access_token', token);
  };

  // Function to remove the access token from state and local storage
  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        // If access token is not available, simply clear local storage and navigate to login page
        console.log("null token")
        localStorage.clear();
        navigate("/login", { replace: false });
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 204) {
        // Logout successful, clear local storage, reset state, and navigate to login page
        setAccessToken(null);
        setusertype(null);
        localStorage.clear();
        navigate("/login", { replace: false });
        console.log("Logout successful");
      } else {
        console.error('Error logging out: Unexpected response', response);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  // Function to check if a valid token is available
  const isValidTokenAvailable = () => {
    return accessToken !== null && accessToken !== undefined && accessToken !== '';
  };

  const isValueAvailable = () => {
    return usertype !== null && usertype !== undefined && usertype !== '';
  };

  const getusertype = () => {
    return usertype;
  }




  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isValidTokenAvailable, isValueAvailable, getusertype }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
