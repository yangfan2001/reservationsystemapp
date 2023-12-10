import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/login/loginPage';
import RegisterPage from '../pages/register/registerPage';
import AdminPage from '../pages/admin/adminPage';
import RestaurantPage from '../pages/Restaurant/restaurantList';
import ProtectedRoute from './ProtectedRoutes';
const AllRoutes:React.FC = () =>{
    return (
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
              <ProtectedRoute>
                  <HomePage />
              </ProtectedRoute>
          } />
          <Route path="/admin" element={
              <ProtectedRoute>
                  <AdminPage />
              </ProtectedRoute>
          } />
          <Route path="/restaurants" element={
              <ProtectedRoute>
                  <RestaurantPage />
              </ProtectedRoute>
          } />
          <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    )
}

export default AllRoutes;