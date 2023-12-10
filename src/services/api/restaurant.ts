import axios from 'axios';
import constants from '../../constants';

export const restaurantLogin =  (email: string, password: string) => {
    return axios.post(`${constants.RESERVATION_ENDPOINT_URL}/login`,{
        email,
        password
    })
};

export const restaurantRegister = async (name: string, email: string, password: string) => {
    
}
