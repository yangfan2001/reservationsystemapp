import React, { useState, useEffect } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Grid, Typography, Paper, MenuItem
  , DialogContentText
} from '@mui/material';
import DataTable from "../../components/dataTable";
import { getRestaurantTables, deleteRestaurantTable, addRestaurantTable } from "../../services/api/restaurantTable";
import { useSnackbar } from "../../components/SnackbarProvier";
import { blueGrey } from "@mui/material/colors";


interface Table {
  id: number;
  size: number;
  description: string;
}

interface Reservation {
  id: number;
  tableId: number;
  time: string;
  status: string;
}

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
  const [tables, setTables] = useState<Table[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [tableSize, setTableSize] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const showSnackbar = useSnackbar();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState("");
  const [confirmDialogText, setConfirmDialogText] = useState("");
  const [toRemoveTableId, setToRemoveTableId] = useState<number>(0);



  const handleTableSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableSize(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const fetchTables = async () => {
      const response = await getRestaurantTables();
      const tables = response.data;
      const tmp: Table[] = []
      for (let table of tables) {
        tmp.push({ id: table.table_id, size: table.size, description: table.description })
      }
      setTables(tmp);
    }
    fetchTables();
  }, [showSnackbar]);

  const addNewTable = async () => {
    await addRestaurantTable(tableSize, description).then((res) => {
      showSnackbar("Add new table successfully", "success");

      setIsAddDialogOpen(false);
    }).catch((err) => {
      if (err.message) {
        showSnackbar("error", err.message);
      } else {
        showSnackbar("Add new table failed", "error",);
      }
    })
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  }

  const handleConfirmDialog = () => {
    if (confirmDialogType === "removeTable") {
      console.log("remove table", toRemoveTableId);
      deleteRestaurantTable(toRemoveTableId).then((res) => {
        showSnackbar("Delete table successfully", "success");
        const tmp = tables.filter((table) => table.id !== toRemoveTableId);
        setTables(tmp);
      }).catch((err) => {
        console.log(err);
        if (err.message) {
          showSnackbar("error", err.message);
        } else {
          showSnackbar("Delete table failed", "error",);
        }
      })
    }
    setIsConfirmDialogOpen(false)
  }

  const removeTable = (tableId: number) => {
    // ... remove table logic
    console.log("remove table", tableId);
    setToRemoveTableId(tableId);
    setConfirmDialogType("removeTable");
    setConfirmDialogText("Are you sure you want to remove this table?");
    setIsConfirmDialogOpen(true);
  }

  // Define your columns here with proper TypeScript types
  const tableColumns: Column[] = [
    { field: 'id', headerName: 'Table ID', width: 100 },
    { field: 'size', headerName: 'Size', width: 100 },
    { field: 'description', headerName: 'Description', width: 120 },
    { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => <Button onClick={() => removeTable(params.row.id)}>Remove</Button> }
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
            <Button variant="contained" color="primary" onClick={() => setIsAddDialogOpen(true)}>
              Add New Table
            </Button>
          </Box>
          
            <DataTable rows={tables} columns={tableColumns} pageSize={5}
              rowsPerPageOptions={[5, 10, 20]} />
         
        </Grid>

        {/* Reservation Grid Item */}
        <Grid item xs={12} md={6} sx={{ paddingLeft: '8px' }}> {/* Adjust left padding for right item */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h2>Reservations</h2>
            {/* If there's a button for reservations, add it here */}
          </Box>
          
            <DataTable rows={reservations} columns={reservationColumns}
              pageSize={3}
              rowsPerPageOptions={[5, 10, 20]} />
         
        </Grid>
      </Grid>
      <Dialog open={isAddDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Table</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            id="table-size"
            label="Table Size"
            value={tableSize} // state variable to hold the selected value
            onChange={handleTableSizeChange} // function to update the state variable
            fullWidth
          >
            {Array.from({ length: 15 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="table-description"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={addNewTable}>Add</Button>
        </DialogActions>
      </Dialog>



      <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
        <DialogContent sx={{ bgcolor: blueGrey[50], pt: 3 }}>
          <DialogContentText sx={{ color: blueGrey[700], textAlign: "center" }}>
            {confirmDialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: blueGrey[50],
            justifyContent: "space-between",
            padding: "8px 24px",
          }}
        >
          <Button
            onClick={() => setIsConfirmDialogOpen(false)}
            sx={{ color: blueGrey[600], fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDialog}
            sx={{ color: blueGrey[800], fontWeight: "bold" }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
}
