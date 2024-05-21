import Layout from "./Layout";
import Login from "./pages/Login";
import { createBrowserRouter } from "react-router-dom";

import Not_Found from "./pages/Not_Found";
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Not_Found />,
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "other",
        element: <div>Hello</div>,
      },
    ],
  },
]);
