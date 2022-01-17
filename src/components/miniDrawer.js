import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { DrawerHeader, AppBar, Drawer } from "../script/ui";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import PrimarySearchAppBar from "./primarySearchAppBar";
import SchoolIcon from "@mui/icons-material/School";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const sidebarList = [
  {
    name: "Training",
    icon: <SchoolIcon />,
  },
  {
    name: "Directory",
    icon: <PeopleIcon />,
    children: ["MYSA", "Contractor", "Others"],
  },
];

const MiniDrawer = () => {
  // Drawer
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Nested Drawer List
  const [openList, setOpenList] = useState(true);
  const handleClick = () => {
    setOpenList(!openList);
  };

  // Nested Drawer List on Collapsed
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Popup nested drawer list on collapsed
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    console.log(event.target.dataset.name);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimarySearchAppBar
        AppBar={AppBar}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarList.map((list, index) => {
            return list.children ? (
              <React.Fragment key={index}>
                <ListItemButton
                  onClick={!openMenu && !open ? handleOpenMenu : handleClick}
                >
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {list.children.map((child, idx) => (
                      <MenuItem
                        key={idx}
                        data-name={child}
                        onClick={handleCloseMenu}
                      >
                        {child}
                      </MenuItem>
                    ))}
                  </Menu>
                  <ListItemIcon>{list.icon}</ListItemIcon>
                  <ListItemText primary={list.name} />
                  {openList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {list.children.map((child, idx) => (
                      <ListItemButton
                        onClick={() => console.log(child)}
                        key={idx}
                        sx={{ pl: 11 }}
                      >
                        <ListItemText primary={child} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItemButton
                onClick={() => console.log(list.name)}
                key={index}
              >
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          // flexGrow: "1",
          p: 3,
          width: "100%",
        }}
      >
        <DrawerHeader />
        <Container maxWidth="lg">
          <Typography align="justify" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography align="justify" paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
