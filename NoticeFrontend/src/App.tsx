import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./app/Menu";
import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";
import CrearNotificacion from "./app/notificaciones/CrearNotificacion";
import type { claim } from "./app/auth/auth.model";
import AutenticacionContext from "./app/auth/AutenticacionContext";
import rutas from './route-config'

const App = () => {
  const [claims,setClaims]=useState<claim[]>([
    // Hard coded usuario + rol
        {nombre:'email', valor:'carlos@gmail.com'}, //El usuario tiene una propiedad email
        {nombre:'role', valor:'admin'} //el usuario tiene una propiedad rol
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
          <i className="bi bi-bell-fill me-2"></i>
          NotiCej
         </span>
        <span/>  Control de Notificaciones
    </div>
        <span>  <Menu/> </span>
      
      
      <Routes>
      {/* Index es la página por defecto */}      

      {/* Hard Coded  */}
      {/* <Route index element={<IndiceNotificaciones/>} /> */}
      {/* Esta es una nueva ruta; se accede con url/crear */}
      {/* <Route path="/notificaciones/crear" element={<CrearNotificacion/>} /> */}

      {/* Implementación dinámica de lo anterior */}
      {rutas.map((ruta, index) => (
        <Route 
          key={index} 
          path={ruta.path} 
          element={ruta.element()} 
        />
      ))}



      </Routes>



    </AutenticacionContext.Provider>
  </BrowserRouter>
  </>
  )
};
export default App;
