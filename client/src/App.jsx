import { Children, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/auth"></Navigate>;
};
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  console.log(isAuthenticated);
  return isAuthenticated ? <Navigate to="/chat"></Navigate> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.status === 200 && response.data.user.id) {
          setUserInfo(response.data.user);
        } else {
          setUserInfo(undefined);
        }
        console.log({ response });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth></Auth>
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat></Chat>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/auth"></Navigate>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
