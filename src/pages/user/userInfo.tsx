import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';

// Define the types for user data and reservations
type UserData = {
  id: number;
  name: string;
  email: string;
};

type Reservation = {
  id: number;
  restaurantName: string;
  date: string;
  canCancel: boolean; // Indicates whether the reservation can be canceled
};

type UserInfoProps = {
  user: UserData;
  reservations: Reservation[];
  onCancelReservation: (reservationId: number) => void; // Function to call when canceling a reservation
};

const UserInfo: React.FC<UserInfoProps> = ({ user, reservations, onCancelReservation }) => {
  // State to track if a cancellation is in progress
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  const handleCancelClick = (reservationId: number) => {
    setIsCancelling(true);
    onCancelReservation(reservationId);
    // Here you would usually call an API to cancel the reservation
    // After the API call, set `isCancelling` back to false
  };

  return (
    <Box>
      <Typography variant="h5">User Information</Typography>
      <Typography variant="body1">Name: {user.name}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Past Reservations
      </Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Restaurant</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Cancel Reservation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.restaurantName}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>
                {reservation.canCancel && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelClick(reservation.id)}
                    disabled={isCancelling}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserInfo;
