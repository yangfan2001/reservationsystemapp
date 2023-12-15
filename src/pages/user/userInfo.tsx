import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Grid, Typography, Paper, MenuItem
  , DialogContentText, Link
} from '@mui/material';
import { getReservationList } from '../../services/api/reservation';
import DataTable from '../../components/dataTable';
import { cancelReservation } from '../../services/api/reservation';
import { useSnackbar } from '../../components/SnackbarProvier';
import { blueGrey } from '@mui/material/colors';
import dayjs from 'dayjs';

// Define the types for user data and reservations


type Reservation = {
  id: number;
  tableId: number;
  time: string;
  status: string;
  restauarntId: number;

};

interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

const UserInfo = () => {
  // State to track if a cancellation is in progress
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [toRemoveReservationId, setToRemoveReservationId] = useState<number>(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const showSnackbar = useSnackbar();

  const onCancelReservation = (reservationId: number) => {

  };

  const handleCancelReservation = (reservationId: number) => {
    console.log("cancel reservation", reservationId);
    setToRemoveReservationId(reservationId);
    setIsConfirmDialogOpen(true);
  }
  const handleConfirmDialog = async () => {
    setIsConfirmDialogOpen(false);
    await cancelReservation(toRemoveReservationId).then((res) => {
      // refresh the page
      if (res.status === 200) {
        showSnackbar('Cancel reservation successfully', 'success');
        window.location.reload();

      } else {
        showSnackbar('Cancel reservation failed', 'error');
      }
    }).catch((err) => {
      showSnackbar('Server Error', 'error');
    });
  }

  const reservationColumns: Column[] = [
    { field: 'tableId', headerName: 'Table ID', width: 80 },
    {
      field: 'time', headerName: 'Time', width: 150,
      renderCell: (params) => {
        const formattedTime = dayjs(params.row.time).format('YYYY-MM-DD HH:mm:ss');
        return <span>{formattedTime}</span>;
      }
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'restauarntId', headerName: 'Restaurant', width: 150,
      renderCell: (params) => {
        return <Link href={`/restaurant/${params.row.restauarntId}`}>View</Link>
      }
    },
    {
      field: 'actions', headerName: 'Actions', width: 150,
      renderCell: (params) => {
        if (params.row.status === "PENDING" || params.row.status === "NO SHOW") {
          return <Button onClick={() => handleCancelReservation(params.row.id)}>Cancel</Button>
        } else {
          return <></>
        }
      }
    },

  ];

  useEffect(() => {
    getReservationList().then((res) => {
      const allReservations = res.data
      const tmp = []
      for (let reservation of allReservations) {
        tmp.push({
          id: reservation.reservationId,
          tableId: reservation.tableId,
          time: reservation.reservationTime,
          status: reservation.status,
          restauarntId: reservation.restaurantId
        })
      }
      setReservations(tmp)
    });
  }, []);

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h5" sx={{ mb: 2, color: blueGrey[700], fontWeight: 'bold' }}> {/* 增加边距、颜色和字体加粗 */}
        User Past Reservations
      </Typography>
      <DataTable rows={reservations} columns={reservationColumns} />


      <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
        <DialogContent sx={{ bgcolor: blueGrey[50], pt: 3 }}>
          <DialogContentText sx={{ color: blueGrey[700], textAlign: "center" }}>
            Are are sure you want to cancel this reservation?
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
};

export default UserInfo;
