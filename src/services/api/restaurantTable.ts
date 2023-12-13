import axiosInstance from "./axiosConfig";
import constants from "../../constants";

export const getRestaurantTables = () => {
    return axiosInstance.get(`${constants.RESTAURANT_TABLE_ENDPOINT_URL}/all`);
}

export const addRestaurantTable = (size: number, description: string) => {
    return axiosInstance.post(`${constants.RESTAURANT_TABLE_ENDPOINT_URL}/add`, {
        size,
        description
    });
}

export const deleteRestaurantTable = (table_id: number) => {
    return axiosInstance.delete(`${constants.RESTAURANT_TABLE_ENDPOINT_URL}/delete/${table_id}`);
}