import Layout from "./Layout";
import Login from "./pages/Login";
import { createBrowserRouter } from "react-router-dom";

import Not_Found from "./pages/Not_Found";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import Seguimiento from "./pages/admin/Seguimiento";
import AsignacionTickets from "./pages/admin/AsignacionTickets";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminDetalleTicket from "./pages/admin/AdminDetalleTicket";
import RequireAdmin from "./helpers/RequireAdmin";

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
        path: "user",
        element: <Dashboard />,
      },
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/usuarios",
        element: (
          <RequireAdmin>
            <AdminUsuarios />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/seguimiento",
        element: (
          <RequireAdmin>
            <Seguimiento />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/asignacion",
        element: (
          <RequireAdmin>
            <AsignacionTickets />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/tickets",
        element: (
          <RequireAdmin>
            <AdminTickets />
          </RequireAdmin>
        ),
      },
      {
        path: "admin/tickets/:id",
        element: (
          <RequireAdmin>
            <AdminDetalleTicket />
          </RequireAdmin>
        ),
      },
    ],
  },
]);
