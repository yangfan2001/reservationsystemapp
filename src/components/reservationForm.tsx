import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { useSnackbar } from './SnackbarProvier';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../services/api/restaurant';
import { validateReservation, createReservation } from '../services/api/reservation';
import { useLocation } from 'react-router-dom';
function generateTimeOptions(openTime:String, closeTime:String) {
  const openingTime = dayjs(`2023-01-01 ${openTime}`);
  const closingTime = dayjs(`2023-01-01 ${closeTime}`);
  const timeOptions = [];

  for (let index = 0; index < 48; index++) {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
    const currentTimeOption = dayjs(`2023-01-01 ${timeString}`);

    if (currentTimeOption.isAfter(openingTime) && currentTimeOption.isBefore(closingTime)) {
      timeOptions.push(timeString);
    }
  }

  return timeOptions;
}



export default function ReservationForm() {
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState('');
  const snackbar = useSnackbar();
  const {restaurantId} = useLocation().state as any;
  const [restaurant, setRestaurant] = useState<any>();
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await getRestaurantById(restaurantId as string);
            setRestaurant(res.data.restaurant);
            setTimeOptions(generateTimeOptions(res.data.restaurant.openTime, res.data.restaurant.closeTime));
        } catch (err) {
            console.log(err);
            snackbar("Server Error", 'error');
        }
    }
    fetchData();
}, []);


  const dataPreCheck = () => {
    // Parse the input date and the current date using dayjs
    const selectedDate = dayjs(date);
    const currentDate = dayjs();

    // Compare only the date parts (ignoring time)
    if (selectedDate.startOf('day').isBefore(currentDate.startOf('day'))) {
      snackbar('Please select a valid date', 'error');
      return false;
    }
    
    // check if all the data is filled
    if (guests === '' || date === null || time === '') {
      snackbar('Please fill in all the data', 'error');
      return false;
    }
    return true;
  }

  const dataPreProcess = () => {
    // extract date from the form convert it in to form "YYYY-MM-DD"
    const reservation_date = date?.format('YYYY-MM-DD');
    return {
      party_size: guests,
      reservation_date: reservation_date as string,
      reservation_time: time as string,
      restaurant_id: restaurantId as string
    }
  }
  const handleCheckAvailability = async() => {
    if (dataPreCheck() === false)
      return;
    const data = dataPreProcess();
    await validateReservation(data.party_size, data.reservation_date, data.reservation_time, data.restaurant_id).then((res) => {
      if (res.data.result) {
        snackbar("Your data is valid, please click reserve button to reserve a seat", 'success');
      }else{
        snackbar("No tables available! Please choose different time Or try to decrease your party size ", 'error');
      }
    }).catch((err) => {
      console.log(err);
      snackbar("Server Error", 'error');
    });
  }

  const handleReservations = async () => {
    if (dataPreCheck() === false)
      return;
    const data = dataPreProcess();
    await createReservation(data.party_size, data.reservation_date, data.reservation_time, data.restaurant_id).then((res) => {
      console.log(res);
      snackbar("Reservation Created Successfully", 'success');
    }).catch((err) => {
      console.log(err);
      console.log(err.response.data);
      snackbar(err.response.data, 'error');
    });
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
      {/* Restaurant Info */}
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        {restaurant?.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
       {restaurant?.foodType} • {restaurant?.priceRange} • {restaurant?.openTime} - {restaurant?.closeTime}
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
              {Array.from({ length: 15 }, (_, i) => i + 1).map((number) =>
                <MenuItem key={number} value={number}>
                  {number} {number === 1 ? 'Guest' : 'Guests'}
                </MenuItem>
              )}
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
              {timeOptions.map(time => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8}>
          <Button variant="contained" color="primary" fullWidth onClick={handleCheckAvailability}>
            Check Availability
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleReservations}>
            Reserve
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
