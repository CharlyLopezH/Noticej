import {NavLink} from "react-router-dom";
import Autorizado from "./auth/Autorizado";


const Menu=()=>{  



  //console.log('Path '+ location.pathname)
  //El navlink evita el full refresh

   return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-auto">
          <div className="d-flex gap-2" role="group">

          <Autorizado role="admin" 
          autorizado={
            <>
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
              Registrar
            </NavLink>
            
            </>
          }
          
          />          

          </div>
        </div>
      </div>
    </div>      
  );

}
export default Menu;