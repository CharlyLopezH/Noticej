import CrearNotificacion from "./app/notificaciones/CrearNotificacion";
import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";


const rutas = [
    {path: '/', element:IndiceNotificaciones, exact:true},
    {path: '/notificaciones', element:IndiceNotificaciones},
    {path: '/notificaciones/crear', element:CrearNotificacion}
];
export default rutas;
