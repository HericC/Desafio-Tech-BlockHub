import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Page404 from './pages/Page404';

function PrivateOutlet() {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<PrivateOutlet />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default MainRoutes;
