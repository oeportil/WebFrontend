import { Navigate, useLocation } from "react-router-dom";
const RequireAdmin = ({ children }) => {
  const location = useLocation();
  // esto es ejemplo nomas pa probar
  const locale = localStorage.getItem("userData");

  if (locale != null) {
    const user = JSON.parse(locale);
    const usuario = { id_rol: user.tipo };
    // Verifica si el usuario es administrador
    if (usuario.id_rol == 1 && location.pathname.includes("/dashboard/admin")) {
      return <Navigate to="/dashboard/user" replace />;
    }
  } else {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireAdmin;
