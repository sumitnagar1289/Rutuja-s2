import React, { useState, useContext } from "react";
import MuiDrawer from "@mui/material/Drawer";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./sidelist.css";
import { Context } from "../../context/ContextProvider";
import {
  ChevronLeft,
 
  Logout,
 
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import Employees from "../employees/Employees";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideList = ({children}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [currentUser, setCurrentUser] = useContext(Context);
  const handleLogout = () => {
    navigate("/");
    setCurrentUser(null);
  };


  return (
    <div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> :  */}
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          {[
            "Home",
            "Employees",
            "Inwards",
            "Outwards",
            "Returns",
            "Logout",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <Home /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
          <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <HomeOutlinedIcon className="icon"/>
            <span>Home</span>
          </li>
          <p className="title">SERVICE</p>
          <Link to="./godowns" style={{ textDecoration: "none" }}>
            <li>
            <StoreIcon className="icon" />
              <span>Godwons</span>
            </li>
            </Link>
            <Link to="./employees" style={{ textDecoration: "none" }}>
            <li>
              
              <PersonOutlineIcon className="icon" />
              <span>Employees</span>
            </li>
            </Link>
            <p className="title">USEFUL</p>
        
          <li>
            <CreditCardIcon className="icon" />
            <span>Inwards</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Returns</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Reports</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Products</span>
          </li>
         
      
        </ul>
        {/* <Button variant="contained" disableElevation>
        Disable elevation
      </Button> */}
      </div>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ""}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 50, height: 50 } })}
            />
          </Tooltip>
        </Box>
        <Box>
          <Box sx={{ textAlign: "center" }}>
            {open && <Typography>{currentUser?.name}</Typography>}
            <Typography variant="body2">
              {currentUser?.role || "role"}
            </Typography>
            {open && (
              <Typography variant="body2">{currentUser?.email}</Typography>
            )}
            <Tooltip title="Logout" sx={{ mt: 1 }}>
              <IconButton onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
      
    </div>
  );
};

export default SideList;
