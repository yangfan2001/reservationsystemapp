import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import DataTable from '../../components/dataTable';
import { getAllRestaurants
 } from '../../services/api/restaurant';
const colunms = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Contact-Email', width: 200 },
]
type RestaurantType = {
    restaurantId: string;
    name: string;
    email: string;
}
type RestaurantListRowType = {
    id: string;
    name: string;
    email: string;
}
export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState<RestaurantListRowType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getAllRestaurants();
                const tmp: RestaurantListRowType[] = [];
                res.data.restaurants.forEach((restaurant:RestaurantType) => {
                    tmp.push({
                        id: restaurant.restaurantId,
                        name: restaurant.name,
                        email: restaurant.email,
                    })
                })
                setRestaurants(tmp as RestaurantListRowType[]);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <Container>
           <DataTable rows={restaurants} columns={colunms}/>
        </Container>
    );
}
