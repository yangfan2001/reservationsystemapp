import Navbar from './Navbar/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/login/loginPage';
import RegisterPage from '../pages/register/registerPage';
import AdminPage from '../pages/admin/adminPage';
import RestaurantPage from '../pages/Restaurant/restaurantList';
import AllRoutes from '../Routes/AllRoutes';

const Layout:React.FC = () =>{
    return (
        <Router>
        <Navbar />
        <AllRoutes/>
      </Router>
    )
}

export default Layout;