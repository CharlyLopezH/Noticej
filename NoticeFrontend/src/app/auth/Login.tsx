import { useContext, useState } from "react";
import AutenticacionContext from "./AutenticacionContext";
import { useNavigate } from "react-router-dom";
import type { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import axios from "axios";
import { urlUsuarios } from "../../utils/endpoints";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";
import MostrarErrores from "../../utils/MostrarErrores";
import FormularioAuth from "./FormularioAuth";

const Login = () => {
  //const [errores, setErrores] = useState<string[]>([]);
  const { actualizar } = useContext(AutenticacionContext);
  const [errores, setErrores] = useState<any>({});
  const navigate = useNavigate();

  async function login(credenciales: credencialesUsuario) {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(
        `${urlUsuarios}/login`,
        credenciales,
      );
      console.log("Respuesta Autenticación!!: " + respuesta);
      guardarTokenLocalStorage(respuesta.data);
      actualizar(obtenerClaims());
      navigate("/");
      console.log(`RESPUESTA acceso al sistema: ${respuesta}`);
    } catch (error: any) {
      //setErrores(error); //error
      // Si hay mensaje específico, úsalo; si no, mensaje genérico
      const mensaje =
        error.response?.data?.message ||
        "Posible error de axios, intenta de nuevo";
      setErrores(mensaje);
    }
  }

  return (
    <>
        <FormularioAuth
          modelo={{ email: "", password: "" }}
          onSubmit={async (valores) => await login(valores)}
          titulo="Acceso al Sistema"
          textoBoton="Entrar"
        />

        {/* <MostrarErrores errores={errores} />   */}      
    </>
  );
};

export default Login;
