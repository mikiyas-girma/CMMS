// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiInstance from './axios'; // Assuming you have an API instance set up

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get('/users/me');
      if (res?.data?.status === 'success') {
        setUser(res.data.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const resetUser = () => {
    setUser(null);
  }

  const triggerLoginAttempt = async () => {
    setLoginAttempted(true);
    await fetchUser();
   
  };

  return (
    <UserContext.Provider
    value={{
            user,
            loading,
            resetUser,
            triggerLoginAttempt
        }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
