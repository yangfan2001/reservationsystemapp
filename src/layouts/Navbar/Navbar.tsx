import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { blueGrey } from "@mui/material/colors";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/login");
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: constants.BACKGROUND_COLOR }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            New York Restaurant Reservation System
          </Typography>
          {role ? (
            <>

              <Typography variant="h6" component="div" >
                {role}
              </Typography>
              <Button color="inherit" onClick={() => setOpenDialog(true)}>
                Log Out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent sx={{ bgcolor: blueGrey[50], pt: 3 }}>
          <DialogContentText sx={{ color: blueGrey[700], textAlign: "center" }}>
            Are you sure you want to log out?
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
            onClick={() => setOpenDialog(false)}
            sx={{ color: blueGrey[600], fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            sx={{ color: blueGrey[800], fontWeight: "bold" }}
            autoFocus
          >
            Log Out { }
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
