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

const RegisterCard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerType, setRegisterType] = useState('customer');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle register logic here
    console.log(username, password, confirmPassword, registerType);
  };

  return (
    <Card sx={{ 
        maxWidth: 345,
        boxShadow: 3, 
        borderRadius: 2, 
        bgcolor: 'background.paper', 
    }}>
      <CardContent>
        <Typography variant="h5" component="div" 
        sx={{textAlign:'center', fontFamily: 'Arial',
            fontWeight: 'bold'}}>
          Register
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Register As</InputLabel>
          <Select
            value={registerType}
            label="Register As"
            onChange={(e) => setRegisterType(e.target.value)}
          >
            <MenuItem value={'customer'}>Customer</MenuItem>
            <MenuItem value={'restaurant'}>Restaurant</MenuItem>
          </Select>
        </FormControl>

        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password"
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField 
          label="Confirm Password" 
          type="password"
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
