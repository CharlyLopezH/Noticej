//Para CRA
//const apiURL = process.env.REACT_APP_API_URL; 
//Para VITE (este proyecto fue creado con vite)
const apiURL = import.meta.env.VITE_APP_API_URL; 
export const urlEntes = `${apiURL}/entes`;
export const urlNotificaciones = `${apiURL}/notificaciones`;