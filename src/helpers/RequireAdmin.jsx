import { Navigate } from "react-router-dom";
const RequireAdmin = ({ children }) => {
  // esto es ejemplo nomas pa probar
  const usuario = { id_rol: 3 };

  // Verifica si el usuario es administrador
  if (usuario.id_rol !== 3) {
    return <Navigate to="/dashboard/user" replace />;
  }

  return children;
};

export default RequireAdmin;
