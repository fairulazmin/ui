import { Outlet } from "react-router-dom";

const menus = [
  {
    name: "Training",
    path: "training",
    element: <Outlet />,
    icon: <SchoolIcon />,
  },
  {
    name: "Directory",
    path: "directory",
    element: <Outlet />,
    icon: <PeopleIcon />,
    children: [
      {
        name: "MYSA",
        path: "mysa",
        element: <DirMysa />,
        children: [
          {
            name: "MYSA's Staff Profile",
            path: ":id",
            element: <Employee />,
          },
        ],
      },
      {
        name: "Customer",
        path: "customer",
        element: <DirCustomer />,
        children: [
          {
            name: "Customer's Profile",
            path: ":id",
            element: <Customer />,
          },
        ],
      },
      {
        name: "Contractor",
        path: "contractor",
        element: <DirContractor />,
        children: [
          {
            name: "Contractor's Profile",
            path: ":id",
            element: <Contractor />,
          },
        ],
      },
    ],
  },
];

export default menus;
