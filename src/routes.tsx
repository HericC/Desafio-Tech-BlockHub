import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Home from './pages/Home';
import HoursRegistration from './pages/HoursRegistration';
import Launch from './pages/Launch';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import ProjectRegistration from './pages/ProjectRegistration';
import Register from './pages/Register';
import ReportLaunch from './pages/ReportLaunch';
import UserRegistration from './pages/UserRegistration';

function PrivateOutlet() {
  const { authenticated } = useContext(AuthContext);
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

function PublicOutlet() {
  const { authenticated } = useContext(AuthContext);
  return !authenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}

function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="" element={<PrivateOutlet />}>
        <Route path="" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="launch" element={<Launch />} />
        <Route path="report" element={<ReportLaunch />} />
      </Route>

      <Route path="" element={<PublicOutlet />}>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="registration" element={<PrivateOutlet />}>
        <Route path="" element={<Page404 />} />
        <Route path="user" element={<UserRegistration />} />
        <Route path="project" element={<ProjectRegistration />} />
        <Route path="hours" element={<HoursRegistration />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default MainRoutes;
