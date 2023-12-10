import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Container } from '@mui/material';
import DataTable from '../../components/dataTable';

const colunms = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Contact-Email', width: 200 },
    { field: 'Description', headerName: 'Description', width: 200 },
]
export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);

    return (
        <Container>
           <DataTable rows={[]} columns={colunms}/>
        </Container>
    );
}
