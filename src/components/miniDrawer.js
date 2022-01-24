import { useState } from "react";
import Box from "@mui/material/Box";
import Content from "./content";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const MiniDrawer = () => {
  // Drawer
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={() => setOpen(true)} />
      <Sidebar open={open} handleDrawerClose={() => setOpen(false)} />
      <Content />
    </Box>
  );
};

export default MiniDrawer;
