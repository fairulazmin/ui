import React, { useState } from "react";
import { DrawerHeader, Drawer } from "../script/ui";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
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

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

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
            <ListItemButton onClick={() => console.log(list.name)} key={index}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
