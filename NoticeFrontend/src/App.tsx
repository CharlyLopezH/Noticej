import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./utils/Menu";
//import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";
import CrearNotificacion from "./app/notificaciones/CrearNotificacion";
import type { claim } from "./app/auth/auth.model";
import AutenticacionContext from "./app/auth/AutenticacionContext";
import rutas from './route-config'
import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";
import Login from "./app/auth/Login";
import Registrar from "./app/auth/Registrar";

const App = () => {
  // Hard coded usuario + rol
  const [claims,setClaims]=useState<claim[]>([
         //Esta información se debe recoger desde el login para ponerla en el context (y no reventar el <Autorizado>)
        //{nombre:'email', valor:''}, //El usuario tiene una propiedad email
        //{nombre:'role', valor:'admin'} //el usuario tiene una propiedad rol cuyo valor es admin y esto define un estado en autorizado.tsx si/no
  ]);

  const actualizar=(claims:claim[])=>{
      setClaims(claims);
  }

  return(
    <>
    <BrowserRouter>      
    <AutenticacionContext.Provider value={{claims,actualizar}}>    
    <div className="container bg-my-header">
        <span className="navbar-brand mb-0 h1 text-primary">
          <i className="bi bi-bell-fill text-warning"></i>          
         </span>
        <span/>  Control de Notificaciones
    </div>
        <span>  <Menu/> </span>
      
      
      <Routes>
      {/* Index es la página por defecto */}      

      {/* Hard Coded  */}
      <Route index element={<IndiceNotificaciones/>} />
      {/* Esta es una nueva ruta; se accede con url/crear */}      
      <Route path="/notificaciones/crear" element={<CrearNotificacion/>} />
      <Route path="/usuarios/registrar" element={<Registrar/>} />
      <Route path="/usuarios/login" element={<Login/>} />

      {/* Implementación dinámica de lo anterior */}

      {/* {rutas.map((ruta, index) => (
        <Route 
          key={index} 
          path={ruta.path}           
          element={ruta.element} 
        />
      ))} */}



      </Routes>

    </AutenticacionContext.Provider>
  </BrowserRouter>
  </>
  )
};
export default App;
