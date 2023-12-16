import axiosInstance from './axiosConfig';
import constants from '../../constants';

export const validateReservation = (party_size:String, reservation_date:String, reservation_time:String,restaurant_id:String) => {
    return axiosInstance.post(`${constants.RESERVATION_ENDPOINT_URL}/validate`, {
        partySize:party_size,
        reservationDate:reservation_date,
        reservationTime:reservation_time,
        restaurantId:restaurant_id
    });
}

export const createReservation = (party_size:String, reservation_date:String, reservation_time:String,restaurant_id:String) => {
    return axiosInstance.post(`${constants.RESERVATION_ENDPOINT_URL}/create`, {
        partySize:party_size,
        reservationDate:reservation_date,
        reservationTime:reservation_time,
        restaurantId:restaurant_id
    });
}

export const getReservationsByRestaurantId = () => {
    return axiosInstance.get(`${constants.RESERVATION_ENDPOINT_URL}/list-by-restaurant`);
}

export const cancelReservation = (reservation_id:Number) => {
    return axiosInstance.post(`${constants.RESERVATION_ENDPOINT_URL}/cancel/${reservation_id }`);
}

export const confirmReservation = (reservation_id:Number) => {
    return axiosInstance.post(`${constants.RESERVATION_ENDPOINT_URL}/confirm/${reservation_id }`);
}

export const getReservationList = ()=>{
    return axiosInstance.get(`${constants.RESERVATION_ENDPOINT_URL}/list`);
}