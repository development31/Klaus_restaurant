// // src/components/Sidebar.js
// import React, { useState } from "react";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import { Link, useLocation } from "react-router-dom";
// import { Typography, ListItemIcon, Box } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
// import AllergenIcon from "@mui/icons-material/Warning";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Logout } from "./Logout";

// const drawerWidth = 300;

// export const Sidebar = ({ drawerOpen, setDrawerOpen }) => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

//   const handleLogoutClick = () => {
//     setLogoutDialogOpen(true);
//   };

//   const handleLogoutClose = () => {
//     setLogoutDialogOpen(false);
//   };

//   return (
//     <>
//       <Drawer
//         variant="persistent"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: "#1f1d2b",
//             color: "white",
//           },
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "start", padding: "20px" }}>
//           <Link to="/" style={{ textDecoration: 'none', color: "white" }}>
//             <Typography variant="h4" fontWeight='bold' component="div" color="#90BE6D">
//               Klaus
//             </Typography>
//           </Link>
//         </Box>
//         <List>
//           {[
//             {
//               text: "Dashboard",
//               path: "/my-Dashboard",
//               icon: <DashboardIcon sx={{ color: "#90BE6D" }} />,
//             },
//             {
//               text: "Manager Management",
//               path: "/manager-management",
//               icon: <PeopleIcon sx={{ color: "#90BE6D" }} />,
//             },
//             {
//               text: "Menu Management",
//               path: "/menu-management",
//               icon: <RestaurantMenuIcon sx={{ color: "#90BE6D" }} />,
//             },
//             {
//               text: "Allergens Management",
//               path: "/allergens-management",
//               icon: <AllergenIcon sx={{ color: "#90BE6D" }} />,
//             },
//             {
//               text: "Logout",
//               icon: <LogoutIcon sx={{ color: "#90BE6D" }} />,
//               action: handleLogoutClick,
//             },
//           ].map((item, index) => (
//             <ListItem
//               button
//               key={item.text}
//               component={item.path ? Link : 'div'}
//               to={item.path}
//               onClick={item.action}
//               sx={{
//                 backgroundColor: currentPath === item.path ? 'rgba(144, 190, 109, 0.26)' : 'transparent',
//                 '&:hover': {
//                   backgroundColor: 'rgba(144, 190, 109, 0.26)',
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ color: "#90BE6D" }}>{item.icon}</ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 primaryTypographyProps={{
//                   sx: {
//                     color: currentPath === item.path ? "#90BE6D" : "white",
//                   },
//                 }}
//               />
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Logout open={logoutDialogOpen} handleClose={handleLogoutClose} />
//     </>
//   );
// };
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AllergenIcon from "@mui/icons-material/Warning";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { Typography } from "@mui/material";
import { Logout } from "./Logout";

const drawerWidth = 300;

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

export const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDashboardClick = () => {
    navigate("/home"); 
  };

  const menuItems = [
    { text: "Dashboard", path: "/home", icon: <DashboardIcon />, onClick: handleDashboardClick },
    { text: "Manager Management", path: "/home/manager-management", icon: <PeopleIcon /> },
    { text: "Menu Management", path: "/home/menu-management", icon: <RestaurantMenuIcon /> },
    { text: "Allergens Management", path: "/home/allergens-management", icon: <AllergenIcon /> },
    { text: "Logout", path: "", icon: <LogoutIcon />, onClick: handleLogoutClick },
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: "#1f1d2b",
          color: "white",
          "& .MuiDrawer-paper": {
            backgroundColor: "#1f1d2b",
            color: "white",
          },
        }}
      >
        <DrawerHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingLeft: "20px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                component="div"
                color="#90BE6D"
              >
                Klaus
              </Typography>
            </Link>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: currentPath === item.path ? "#3A493C" : "inherit", 
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
                component={Link}
                to={item.path} 
                onClick={item.onClick} 
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: currentPath === item.path ? "#90BE6D" : "white",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: currentPath === item.path ? "#90BE6D" : "white",
                    },
                  }}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Logout open={dialogOpen} handleClose={handleCloseDialog} />
    </>
  );
};