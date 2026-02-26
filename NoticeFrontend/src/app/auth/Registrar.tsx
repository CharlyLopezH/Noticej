import axios from "axios";
import type { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { urlUsuarios } from "../../utils/endpoints";
import AutenticacionContext from "./AutenticacionContext";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MostrarErrores from "../../utils/MostrarErrores";

const Registrar=()=> {

    const [errores, setErrores] = useState<string[]>([]);
    const {actualizar} = useContext(AutenticacionContext);
    const navigate = useNavigate();

    async function registrar(credenciales: credencialesUsuario) {
        try {
            console.log(`UrlUsuarios ${urlUsuarios} endpoint`);
            const respuesta = await axios
                .post<respuestaAutenticacion>(`${urlUsuarios}/registrar`, credenciales);
                guardarTokenLocalStorage(respuesta.data);
                actualizar(obtenerClaims());
                navigate("/");
            console.log(respuesta.data);
        } catch (error: unknown ) {
                if (axios.isAxiosError(error)) {
        // Error específico de Axios
        if (error.response?.data) {
            setErrores(Array.isArray(error.response.data) 
                ? error.response.data 
                : [error.response.data]);
        } else {
            setErrores([error.message]);
        }
    } else if (error instanceof Error) {
        // Error genérico
        setErrores([error.message]);
    } else {
        // Error desconocido
        setErrores(['Ha ocurrido un error desconocido']);
    }
        }
    }


    return (
    <>
            <MostrarErrores errores={errores} />
            <FormularioAuth 
                modelo={{ email: '', password: '' }}                                 
                onSubmit={async valores => await registrar(valores)}
                titulo="Registrar usuario"
                textoBoton="Guardar"
        />
    </>

    )
}
export default Registrar;