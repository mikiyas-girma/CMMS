import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/Slice/userSlice";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!loading) setLoading(true);
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    if (!loginAttempted) {
      fetchUserData();
    }
  }, [dispatch, loginAttempted]);

  const resetUser = () => {
    setLoginAttempted(false); // Ensure loginAttempted is reset when user is reset
  };
  const { user } = useSelector((state) => state.user);

  const triggerLoginAttempt = async () => {
    setLoginAttempted(true);
    await dispatch(fetchUser());
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      resetUser,
      triggerLoginAttempt,
    }),
    [user, loading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
