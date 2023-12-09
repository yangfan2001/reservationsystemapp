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

const LoginCard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('customer');

  const handleLogin = () => {
    // Handle login logic here
    console.log(username, password, loginType);
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
          Log In
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Login As</InputLabel>
          <Select
            value={loginType}
            label="Login As"
            onChange={(e) => setLoginType(e.target.value)}
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
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
