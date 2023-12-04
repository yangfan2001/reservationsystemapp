import * as React from 'react';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ReservationForm() {
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState('');

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
      {/* Restaurant Info */}
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        New York Restaurant
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
        International • $$ • Main St
      </Typography>

      {/* Reservation Form */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="guests-label">Guests</InputLabel>
            <Select
              labelId="guests-label"
              id="guests-select"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              label="Guests"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) =>
                <MenuItem key={number} value={number}>
                  {number} {number === 1 ? 'Guest' : 'Guests'}
                </MenuItem>
              )}
              <MenuItem value={11}>10+ Guests</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="time-label">Time</InputLabel>
            <Select
              labelId="time-label"
              id="time-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Time"
            >
              <MenuItem value={"morning"}>Morning</MenuItem>
              <MenuItem value={"afternoon"}>Afternoon</MenuItem>
              <MenuItem value={"evening"}>Evening</MenuItem>
              <MenuItem value={"all_day"}>All Day</MenuItem>
              {/* ... other options */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8}>
          <Button variant="contained" color="primary" fullWidth>
            Check Availability
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="secondary" fullWidth>
            Reserve
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
