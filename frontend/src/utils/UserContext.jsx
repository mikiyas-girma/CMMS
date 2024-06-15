import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import apiInstance from './axios'; // Assuming you have an API instance set up

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const fetchUser = async () => {
    // Only set loading to true if it's currently false
    if (!loading) setLoading(true);
    try {
      const res = await apiInstance.get('/users/me');
      if (res?.data?.status === 'success') {
        setUser(res.data.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      // Always set loading to false after the fetch operation completes
      setLoading(false);
    }
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

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    loading,
    resetUser,
    triggerLoginAttempt
  }), [user, resetUser, triggerLoginAttempt]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
