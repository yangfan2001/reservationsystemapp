import React, { useEffect } from 'react';
import UserInfo from './user/userInfo';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    let navigate = useNavigate();

    useEffect(() => {
        navigate('/restaurants');
    }, [navigate]);

    return (
        <>
            
        </>
    );
}
