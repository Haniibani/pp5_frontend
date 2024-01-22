import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import axios from "axios";

import { useHistory } from "react-router";

import { axiosReq, axiosRes } from "../clients/axios";

import removeTokenTimestamp from "../utils/removeTokenTimestamp";
import shouldRefreshToken from "../utils/shouldRefreshToken";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    handleMount();
  }, []);

  const handleTokenRefreshError = useCallback((err) => {
    setCurrentUser((prevCurrentUser) => {
      if (prevCurrentUser) {
        history.push("/signin");
      }
      return null;
    });
    removeTokenTimestamp();
    console.error("Token refresh error:", err);
  }, [history]);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            handleTokenRefreshError(err);
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            handleTokenRefreshError(err);
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [handleTokenRefreshError]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
