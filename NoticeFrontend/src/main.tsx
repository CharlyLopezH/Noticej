import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles.css'
//import IndiceEntes from './app/entes/IndiceEntes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CrearNotificacion from './app/notificaciones/CrearNotificacion'
import IndiceNotificaciones from './app/notificaciones/IndiceNotificaciones'
import Menu from './app/Menu'


createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <BrowserRouter>  
  {/* Encabezado del Proyecto */}
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
  </BrowserRouter>
</StrictMode>
)
