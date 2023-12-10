import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import constants from '../constants';

const RegisterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [password, setPassword] = useState('');
  const [registerType, setRegisterType] = useState('customer');

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault(); // 阻止默认表单提交行为
    // Handle register logic here
    console.log(email, username, restaurantName, password, registerType);
  };

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
          {registerType === 'restaurant' && (
            <TextField 
              label="Restaurant Name" 
              variant="outlined" 
              fullWidth 
              margin="normal"
              required
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
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