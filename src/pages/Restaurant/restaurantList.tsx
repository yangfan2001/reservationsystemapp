import React, { useState, useEffect } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Container, Link } from '@mui/material';
import DataTable from '../../components/dataTable';
import {
    getAllRestaurants
} from '../../services/api/restaurant';
const columns = [
    {
        field: 'name',
        headerName: 'Restaurant Name',
        width: 300,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Link href={`/restaurant/${params.id}`}>
                    {params.value as string}
                </Link>
            );
        }
    },
    {
        field: 'email',
        headerName: 'Contact-Email',
        width: 400
    }
];
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
            try {
                const res = await getAllRestaurants();
                const tmp: RestaurantListRowType[] = [];
                res.data.restaurants.forEach((restaurant: RestaurantType) => {
                    tmp.push({
                        id: restaurant.restaurantId,
                        name: restaurant.name,
                        email: restaurant.email,
                    })
                })
                setRestaurants(tmp as RestaurantListRowType[]);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <Container>
            <DataTable rows={restaurants} columns={columns} />
        </Container>
    );
}
