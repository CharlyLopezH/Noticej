import {Link, NavLink} from "react-router-dom";
import Autorizado from "./auth/Autorizado";


const Menu=()=>{  



  //console.log('Path '+ location.pathname)
  //El navlink evita el full refresh

   return (
    // Menú
      // <div className="row justify-content bg-info bg-opacity-10 style={{display: 'flex', justifyContent: 'space-between' }}">
      <div className="d-flex align-items-center gap-3">
        <div className="col-auto">
          <div className="d-flex gap-2" role="group">
          <Autorizado
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
              Nueva
            </NavLink>            
            </>
          }                    
          />    

           <div className="d-flex gap-2">
            <Autorizado 
            noAutorizado={<>No Autorizado</>}
            autorizado={
              <>
              <Link to="/usuarios/registrar" className="text-end w-100">
              Registrar
              </Link>
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