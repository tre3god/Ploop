import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function NavBar({ user, setUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOut();
    setUser(null); 
    navigate("/")
  };

  return (
    <AppBar position="static" style={{ background: "white" }}>
      <Toolbar>
        <Link to="/">
        <img
          src="https://i.imgur.com/6Rgthpn.png"
          alt="Logo"
          width="120"
          height="auto"
          style={{ marginLeft: "50px", marginRight: "650px" }}
        />
        </Link>
        <Typography variant="h6" style={{ color: "black", width: "45%" }}>
          <span>Welcome, {user.name}</span>
        </Typography>
        <Button
          aria-controls="menu" 
          aria-haspopup="true"
          onClick={handleMenuOpen}
          style={{ color: "black" }}
        >
          Menu
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/calender" style={{ color: "inherit" }}>
              Calender
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/user/analysis" style={{ color: "inherit" }}>
              Analysis
            </Link>
          </MenuItem>
          {/* <MenuItem onClick={handleMenuClose}>
            <Link to="/learn" style={{ color: "inherit" }}>
              Learn
            </Link>
          </MenuItem> */}
			<MenuItem>
			<Button 
			color="error" 
			variant="contained"
			onClick={handleLogout}
			>
				Log Out
			</Button>
			</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
