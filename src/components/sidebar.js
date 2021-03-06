import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import StorageIcon from "@mui/icons-material/Storage";

const sidebarList = [
  {
    name: "Training",
    icon: <SchoolIcon />,
  },
  {
    name: "Directory",
    icon: <PeopleIcon />,
    children: ["MYSA", "Customer", "Contractor", "Others"],
  },
  {
    name: "Migration",
    icon: <StorageIcon />,
    children: ["Bahagian", "Pegawai", "Latihan", "Rekod"],
  },
];

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  // Nested Drawer List
  const [openList, setOpenList] = useState({});
  const handleClick = (name) => {
    setOpenList({ ...openList, [name]: !openList[name] });
  };

  // Nested Drawer List on Collapsed
  const [anchorEl, setAnchorEl] = useState({});
  // const openMenu = Boolean(anchorEl);

  // Popup nested drawer list on collapsed
  const handleOpenMenu = (event, name) => {
    setAnchorEl({ ...anchorEl, [name]: event.currentTarget });
  };

  const handleCloseMenu = (event) => {
    const { parent, name } = event.target.dataset;
    name && navigate(`/${parent.toLowerCase()}/${name.toLowerCase()}`);
    setAnchorEl({});
  };

  const navigate = useNavigate();

  useEffect(() => {
    const anchorList = sidebarList
      .filter((list) => list.children)
      .map((li) => li.name.toLowerCase());
    // let anchor = {};
    // anchorList.map((li) => (anchor = { ...anchor, [li]: null }));
    // setAnchorEl(anchor);
    setAnchorEl(anchorList.reduce((x, y) => (x = { ...x, [y]: null }), {}));
    setOpenList(anchorList.reduce((x, y) => (x = { ...x, [y]: false }), {}));
    // setOpenList()
  }, []);

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
                onClick={
                  !Boolean(anchorEl[list.name.toLowerCase()]) && !open
                    ? (event) => handleOpenMenu(event, list.name.toLowerCase())
                    : open
                    ? () => handleClick(list.name.toLowerCase())
                    : null
                }
              >
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl[list.name.toLowerCase()]}
                  open={Boolean(anchorEl[list.name.toLowerCase()])}
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
                      data-parent={list.name}
                      onClick={handleCloseMenu}
                    >
                      {child}
                    </MenuItem>
                  ))}
                </Menu>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
                {openList[list.name.toLowerCase()] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              {open && (
                <Collapse
                  in={openList[list.name.toLowerCase()]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {list.children.map((child, idx) => (
                      <ListItemButton
                        onClick={() =>
                          navigate(
                            `/${list.name.toLowerCase()}/${child.toLowerCase()}`
                          )
                        }
                        key={idx}
                        sx={{ pl: 11 }}
                      >
                        <ListItemText primary={child} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ) : (
            <ListItemButton
              onClick={() => navigate(`/${list.name.toLowerCase()}`)}
              key={index}
            >
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
