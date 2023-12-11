import axios from 'axios';
import constants from '../../constants';

export const userLogin = (email:String,password:String) =>{
    return axios.post(`${constants.CUSTOMER_ENDPOINT_URL}/login`,{
        email,
        password
    })
}

export const userRegister = (name:String,email:String,password:String) =>{
    return axios.post(`${constants.CUSTOMER_ENDPOINT_URL}/register`,{
        name,
        email,
        password
    })
}