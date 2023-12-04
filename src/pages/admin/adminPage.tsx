import React from "react";
import { useEffect,useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const initialTables = [
    { id: 1, reservations: [] },
    // ...其他桌位
  ];
  
  const initialReservations = [
    { id: 1, tableId: 1, time: '18:00', status: 'pending' },
    // ...其他预约
  ];


  
export default function AdminPage() {
    const [tables, setTables] = useState(initialTables);
  const [reservations, setReservations] = useState(initialReservations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  // 添加新桌位
  const addNewTable = () => {
    handleOpenDialog();
    const newTable = { id: tables.length + 1, reservations: [] };
    setTables([...tables, newTable]);
  };

  // 删除桌位
  const removeTable = (tableId: number) => {
    setTables(tables.filter(table => table.id !== tableId));
  };

  // 打开添加桌位对话框
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // 关闭添加桌位对话框
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // 更新预约状态
  const updateReservationStatus = (reservationId:number, status:string) => {
    setReservations(
      reservations.map(reservation => 
        reservation.id === reservationId ? { ...reservation, status } : reservation
      )
    );
  };


    useEffect(() => {
        /*
        // get user role from session storage
        const role = sessionStorage.getItem("role");
        if (role !== "admin") {
            window.location.href = "/";
        }*/
    }, []); 
    return (
        <Box>
        <Button onClick={addNewTable}>Add New Table</Button>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Table ID</TableCell>
              <TableCell align="right">Reservations</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((table) => (
              <TableRow key={table.id}>
                <TableCell component="th" scope="row">
                  {table.id}
                </TableCell>
                <TableCell align="right">{table.reservations.length}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => removeTable(table.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <h2>Reservations</h2>
        <Table component={Paper}>
          {/* ...同上，列出所有预约和操作按钮... */}
        </Table>
  
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Add a New Table</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Table Name" fullWidth />
            <TextField autoFocus margin="dense" label="Table size" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleCloseDialog}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
}