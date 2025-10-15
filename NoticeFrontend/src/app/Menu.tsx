import { Link, useLocation } from "react-router-dom";


const Menu=()=>{  

  const location = useLocation();


  console.log('Path '+ location.pathname)

    return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-auto">
          <div className="d-flex gap-2" role="group">
            <Link
              className={`btn btn-sm ${location.pathname === '/' ? 'btn-secondary' : 'btn-outline-secondary'}`}
              to="/"
            >
              <i className="bi bi-table me-1"></i>
              Bitácora
            </Link>
            
            <Link 
              className={`btn btn-sm ${location.pathname === '/notificaciones/crear' ? 'btn-secondary' : 'btn-outline-secondary'}`}
              to="/notificaciones/crear"
            >
              <i className="bi bi-plus-circle me-1"></i>
              Crear Nueva
            </Link>
          </div>
        </div>
      </div>
    </div>      
  );

}
export default Menu;