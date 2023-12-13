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
import { restaurantLogin } from '../services/api/restaurant';
import { userLogin } from '../services/api/user';
import { useNavigate } from 'react-router-dom';
import { Snackbar,Alert } from '@mui/material';


const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('customer');
  const navigate = useNavigate();
  const [errorInfo, setErrorInfo] = useState(''); 
  const [failSnackbar, setFailSnackbar] = useState(false);


  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // 阻止默认表单提交行为
    // Handle login logic here
    if (loginType === 'customer') {
      userLogin(email, password).then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          sessionStorage.setItem('role', 'customer');
          sessionStorage.setItem('token', token);
          navigate('/restaurants');
        }
      }).catch((err) => {
        if(err.response.status === 401){
         setErrorInfo("Invalid email or password");
         setFailSnackbar(true);
       }else{
         setErrorInfo("Server error");
         setFailSnackbar(true);
       }
       });
    } else {
      restaurantLogin(email, password).then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          sessionStorage.setItem('role', 'restaurant');
          sessionStorage.setItem('token', token);
          navigate('/admin');
        }
      }).catch((err) => {
       if(err.response.status === 401){
        setErrorInfo("Invalid email or password");
        setFailSnackbar(true);
      }else{
        setErrorInfo("Server error");
        setFailSnackbar(true);
      }
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontFamily: 'Arial', fontWeight: 'bold' }}>
          Log In
        </Typography>

        <form onSubmit={handleLogin}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Login As</InputLabel>
            <Select
              value={loginType}
              label="Login As"
              onChange={(e) => setLoginType(e.target.value as string)}
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
            Log In
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </CardContent>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={failSnackbar} autoHideDuration={5000} onClose={() => { setFailSnackbar(false) }}>
        <Alert onClose={() => { setFailSnackbar(false) }} severity="error" sx={{ width: '100%' }}>
          {errorInfo}
        </Alert>
      </Snackbar>

    </Card>
  );
};

export default LoginCard;
