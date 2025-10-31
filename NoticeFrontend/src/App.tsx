import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./app/Menu";
import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";
import CrearNotificacion from "./app/notificaciones/CrearNotificacion";
import type { claim } from "./app/auth/auth.model";
import AutenticacionContext from "./app/auth/AutenticacionContext";

const App = () => {
  const [claims,setClaims]=useState<claim[]>([
        {nombre:'email', valor:'carlos@gmail.com'},
        {nombre:'role', valor:'adminis'}
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
        <span/>- Control de Notificaciones
        <span>  <Menu/> </span>
    </div>
      <Routes>
      {/* Inces es la página por defecto */}      
      <Route index element={<IndiceNotificaciones/>} />
         {/* Esta es una nueva ruta; se accede con url/crear */}
    <Route path="/notificaciones/crear" element={<CrearNotificacion/>} />
    </Routes>
    </AutenticacionContext.Provider>
  </BrowserRouter>
  </>
  )
};
export default App;
