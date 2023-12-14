import axios from 'axios';
import constants from '../../constants';

export const restaurantLogin =  (email: string, password: string) => {
    return axios.post(`${constants.RESTAURANT_ENDPOINT_URL}/login`,{
        email,
        password
    })
};

export const restaurantRegister = async (name: string, email: string, password: string, open_time:string, close_time:string,food_type:string,price_range:string) => {
    return axios.post(`${constants.RESTAURANT_ENDPOINT_URL}/register`,{
        name,
        email,
        password,
        openTime:open_time,
        closeTime:close_time,
        foodType:food_type,
        priceRange:price_range
    })
}


export const getAllRestaurants = async () => {
    return axios.get(`${constants.RESTAURANT_ENDPOINT_URL}/all`)
}

export const getRestaurantById = async (restaurant_id:String) => {
    return axios.get(`${constants.RESTAURANT_ENDPOINT_URL}/data/${restaurant_id}`)
}

