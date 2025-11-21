import CrearNotificacion from "./app/notificaciones/CrearNotificacion";
import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";
import RutaNoEncontrada from "./RutaNoEncontrada";

const rutas = [
    {path: '/', element:IndiceNotificaciones},
    {path: '/notificaciones/', element:IndiceNotificaciones},
    {path: '/notificaciones/crear', element:CrearNotificacion},
    {path: '*',element:RutaNoEncontrada}
];
export default rutas;
