import CrearNotificacion from "./app/notificaciones/CrearNotificacion";
import IndiceNotificaciones from "./app/notificaciones/IndiceNotificaciones";
import RutaNoEncontrada from "./RutaNoEncontrada";
import Registrar from "./app/auth/Registrar";
import Login from "./app/auth/Login";


const rutas = [
    {path: '/', element:IndiceNotificaciones},
    {path: '/notificaciones/', element:IndiceNotificaciones},
    {path: '/notificaciones/crear', element:CrearNotificacion},
    {path: '/usuarios/registrar',element:Registrar},
    {path: '/usuarios/login',element:Login},
    {path: '*',element:RutaNoEncontrada},
];
export default rutas;
