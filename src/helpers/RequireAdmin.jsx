import { Navigate, useLocation} from "react-router-dom";
const RequireAdmin = ({ children }) => {
  const location = useLocation()
  // esto es ejemplo nomas pa probar
  const usuario = { id_rol: 1 };
  console.log(location.pathname)

  // Verifica si el usuario es administrador
  if (usuario.id_rol !== 3 &&  location.pathname.includes("/dashboard/admin")) {
    return <Navigate to="/dashboard/user" replace />;
  }
  if(usuario.id_rol === 3 && location.pathname.includes("/dashboard/user")){
    return <Navigate to="/dashboard/admin" replace />;
  }
  return children;
};

export default RequireAdmin;
