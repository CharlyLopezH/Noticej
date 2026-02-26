import { Link, NavLink } from "react-router-dom";
import Autorizado from "../app/auth/Autorizado";
import Button from "./Button";
import { logout } from "../app/auth/manejadorJWT";
import { useContext } from "react";
import AutenticacionContext from "../app/auth/AutenticacionContext";

const Menu = () => {
  const { actualizar, claims } = useContext(AutenticacionContext);
  const obtenerNombreUsuario = () => {
    return claims.filter((x) => x.nombre === "email")[0]?.valor;
  };

  console.log("Estamos en el Menú: Path " + location.pathname);
  //El navlink evita el full refresh!!

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div
        className="container-fluid"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavLink className="navbar-brand" to="/">
          Index
        </NavLink>

        <div className="d-flex">
          <Autorizado
          //En caso de autorización
                            autorizado={<>
                            <div style={{ 
                            fontSize: '14px', 
                            color: '#848684', 
                            marginRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',     // Centrado vertical
                            justifyContent: 'flex-start' //(por defecto, alineado a la izquierda)
                            }}>
                              {obtenerNombreUsuario()}
                            </div>
                            <Button 
                            onClick={() => {
                                logout();
                                actualizar([]);
                            }}
                            className="btn btn-outline-primary  btn-sm me-1">Cerrar
                            <i className="bi bi-box-arrow-in-right me-1"></i>
                            </Button>
                            </>}
            noAutorizado={
              <>
              <Link to="/usuarios/registrar" className="btn btn-outline-primary btn-sm me-1" >
              <i className="bi bi-person-add me-1"></i>
                Registrar
              </Link>
              <Link to="/usuarios/Login" className="btn btn-outline-primary btn-sm">
              <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Link>
              </>
            }
          />
        </div>
      </div>
    </nav>
  );
};
export default Menu;
