import React, { useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Grid, Typography, Paper
} from '@mui/material';
import DataTable from "../../components/dataTable";
import { tr } from "date-fns/locale";

interface Table {
  id: number;
  reservations: Reservation[];
}

interface Reservation {
  id: number;
  tableId: number;
  time: string;
  status: string;
}

const initialTables: Table[] = [
  { id: 1, reservations: [] },
  // ...其他桌位
];

const initialReservations: Reservation[] = [
  { id: 1, tableId: 1, time: '18:00', status: 'pending' },
  // ...其他预约
];

interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

export default function AdminPage() {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isYesOrNoDialogOpen, setIsYesOrNoDialogOpen] = useState(false);

  const addNewTable = () => {
    setIsAddDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  }

  const removeTable = (tableId: number) => {
    // ... remove table logic
  }

  // Define your columns here with proper TypeScript types
  const tableColumns: Column[] = [
    { field: 'id', headerName: 'Table ID', width: 150 },
    { field: 'reservations', headerName: 'Reservations', width: 150, renderCell: (params) => <span>{params.value.length}</span> },
    { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => <Button onClick={() => removeTable(params.value)}>Remove</Button> }
  ];

  const reservationColumns: Column[] = [
    { field: 'id', headerName: 'Reservation ID', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    // ... other columns for reservations
  ];


  // ... (rest of your component logic)

  return (
    <Box sx={{ flexGrow: 1, padding: '0 64px' }}> {/* Add padding to the container */}
      <Grid container spacing={3}>
        {/* Table Grid Item */}
        <Grid item xs={12} md={6} sx={{ paddingRight: '8px' }}> {/* Adjust right padding for left item */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h2>Restaurant Tables</h2>
            <Button variant="contained" color="primary" onClick={addNewTable}>
              Add New Table
            </Button>
          </Box>
          <Paper>
            <DataTable rows={tables} columns={tableColumns} />
          </Paper>
        </Grid>

        {/* Reservation Grid Item */}
        <Grid item xs={12} md={6} sx={{ paddingLeft: '8px' }}> {/* Adjust left padding for right item */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h2>Reservations</h2>
            {/* If there's a button for reservations, add it here */}
          </Box>
          <Paper>
            <DataTable rows={reservations} columns={reservationColumns} />
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={isAddDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Table</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Table Name" fullWidth />
          <TextField autoFocus margin="dense" label="Table Size" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
