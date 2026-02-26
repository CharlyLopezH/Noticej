import {Link, NavLink} from "react-router-dom";
import Autorizado from "../app/auth/Autorizado";
import Button from "./Button";
import { logout } from "../app/auth/manejadorJWT";
import { useContext } from "react";
import AutenticacionContext from "../app/auth/AutenticacionContext";


const Menu=()=>{  
  
  const {actualizar, claims} = useContext(AutenticacionContext);
   const obtenerNombreUsuario = ()=> {
        return claims.filter(x => x.nombre === "email")[0]?.valor;
    }


  //console.log('Path '+ location.pathname)
  //El navlink evita el full refresh

   return (
  <div className="d-flex justify-content-between align-items-center p-3 bg-light bg-opacity-100">
    {/* Botones a la izquierda  ¡¡Código Repetido!!*/} 
    <div className="d-flex gap-2">
      <Autorizado
        autorizado={<>
          <span className="nav-link">Hola, {obtenerNombreUsuario()}</span>
                            <Button 
                            onClick={() => {
                                logout();
                                actualizar([]);
                            }}
                            className="nav-link btn btn-link">Log out</Button>

            <NavLink
              className={({isActive}) => 
                `btn btn-sm ${isActive ? 'btn-outline-primary' : 'btn-outline-secondary'}`}                            
              to="/"
            >
              <i className="bi bi-table me-1"></i>
              Bitácora
            </NavLink>
            
            <NavLink 
              className={({isActive}) =>
                `btn btn-sm ${isActive ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
              to="/notificaciones/crear"
            >
              <i className="bi bi-plus-circle me-1"></i>
              Nueva
            </NavLink>
          </>
        }
      />
    </div>

    {/* Registrar y Login desplegados a la derecha */}
    <div className="d-flex gap-2">
      <Autorizado 
        noAutorizado={
          <Link to="/usuarios/login" className="btn btn-outline-primary btn-sm">
            <i className="bi bi-box-arrow-in-right me-1"></i>
            Login
          </Link>
        }
        autorizado={
          <>
          {/* <Link to="/usuarios/registrar" className="btn btn-outline-info btn-sm">
            <i className="bi bi-person-add me-1"></i>
            Registrar
          </Link>       */}
          <Link to="/usuarios/login" className="btn btn-outline-info btn-sm">
            <i className="bi bi-person-check me-1"></i>
            Login
          </Link>      
          </>            
        }        
      />
    </div>
  </div>
)
      

}
export default Menu;