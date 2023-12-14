import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField,
  Button, Link, FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import constants from '../constants';
import { userRegister } from '../services/api/user';
import { restaurantRegister } from '../services/api/restaurant';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from './SnackbarProvier';


const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minute = index % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});




const RegisterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [password, setPassword] = useState('');
  const [registerType, setRegisterType] = useState('customer');
  const navigate = useNavigate();

  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [restaurantType, setRestaurantType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const snackbar = useSnackbar();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault(); // 阻止默认表单提交行为
    if (registerType === 'customer') {
      userRegister(username, email, password).then((res) => {
        if (res.status === 200) {
          navigate('/login');
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      restaurantRegister(restaurantName, email, password, openTime, 
        closeTime, restaurantType, priceRange).then((res) => {
        if (res.status === 200) {
          navigate('/login');
        }
      }).catch((err) => {
        if(err.response.status === 400){
          snackbar(err.response.data, 'error');
        }
        console.log(err);
      });
    }
    console.log(email, username, restaurantName, password, registerType);
  };


  const getRegisterAdditionalInfo = () => {
    return (
      <Grid container >
  <Grid item xs={12}>
    <TextField
      label="Restaurant Name"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      value={restaurantName}
      onChange={(e) => setRestaurantName(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={6} style={{ paddingRight: '8px' }}>
    <FormControl fullWidth margin="normal">
      <InputLabel>Open Time</InputLabel>
      <Select
        value={openTime}
        label="Open Time"
        required
        onChange={(e) => setOpenTime(e.target.value)}
      >
        {timeOptions.map(time => (
          <MenuItem key={time} value={time}>{time}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={6} style={{ paddingLeft: '8px' }}>
    <FormControl fullWidth margin="normal">
      <InputLabel>Close Time</InputLabel>
      <Select
        value={closeTime}
        label="Close Time"
        required
        onChange={(e) => setCloseTime(e.target.value)}
      >
        {timeOptions.map(time => (
          <MenuItem key={time} value={time}>{time}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={6} style={{ paddingRight: '8px' }}>
    <TextField
      label="Food Type"
      fullWidth
      margin="normal"
      required
      value={restaurantType}
      onChange={(e) => setRestaurantType(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={6} style={{ paddingLeft: '8px' }}>
    <FormControl fullWidth margin="normal">
      <InputLabel>Price Range</InputLabel>
      <Select
        value={priceRange}
        label="Price Range"
        required
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <MenuItem value={'$'}>$</MenuItem>
        <MenuItem value={'$$'}>$$</MenuItem>
        <MenuItem value={'$$$'}>$$$</MenuItem>
        <MenuItem value={'$$$$'}>$$$$</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>

    )
  }

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontFamily: 'Arial', fontWeight: 'bold' }}>
          Register
        </Typography>

        <form onSubmit={handleRegister}>
          <FormControl fullWidth margin="normal">
            
              <InputLabel>Register As</InputLabel>
              <Select
                value={registerType}
                label="Register As"
                onChange={(e) => setRegisterType(e.target.value as string)}
              >
                <MenuItem value={'customer'}>Customer</MenuItem>
                <MenuItem value={'restaurant'}>Restaurant</MenuItem>
              </Select>
          </FormControl>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {registerType === 'customer' && (
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            
          )}

<TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {registerType === 'restaurant' && getRegisterAdditionalInfo()}

          

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: constants.BUTTON_COLOR, '&:hover': { backgroundColor: constants.BUTTON_COLOR_HOVER } }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;