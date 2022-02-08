import { DrawerHeader } from "../script/ui";
import { Routes, Route, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DirContractor from "./dirContractor";
import DirCustomer from "./dirCustomer";
import DirMysa from "./dirMysa";
import DirOthers from "./dirOthers";
import Training from "./training";
import Employee from "./employee";
import Contractor from "./contractor";
import Customer from "./customer";

const Content = () => {
  return (
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
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="directory" element={<Outlet />}>
              <Route path="mysa" element={<DirMysa />}>
                <Route path=":id" element={<Employee />} />
              </Route>
              <Route path="customer" element={<DirCustomer />}>
                <Route path=":id" element={<Customer />} />
              </Route>
              <Route path="contractor" element={<DirContractor />}>
                <Route path=":id" element={<Contractor />} />
              </Route>
              <Route path="others" element={<DirOthers />}>
                <Route path=":id" element={<Contractor />} />
              </Route>
            </Route>
            <Route path="training" element={<Training />} />
          </Route>
        </Routes>
      </Container>
    </Box>
  );
};

export default Content;
