import React, { useState, useEffect } from 'react';
import ReservationForm from '../../components/reservationForm';
import { useParams } from 'react-router-dom';

export default function RestaurantDetailPage() {
    const {restaurantId} = useParams();
    
    return (
    <>
        <ReservationForm />
    </>);
}