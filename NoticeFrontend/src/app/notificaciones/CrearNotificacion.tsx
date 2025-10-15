import { useRef, useState } from "react";
import axios from "axios";
import NotificacionForm from "../notificaciones/NotificacionForm";
import Swal from "sweetalert2";
import type { FormikProps } from "formik";
import type { crearNotificacionDTO } from "../../models/notificaciones.model";
import { convertirFechaAISO } from "../../utils/utilerias";
import { urlNotificaciones } from "../../utils/endpoints";
import { handleApiError } from "../../utils/errorHandler";

const CrearNotificacion=()=> {
  console.log('ENTRANDO!!!!!!!');
  // Variables de estado manejar loading y mensajes de retroalimentación
  const [loading, setLoading] = useState(false);
    // 1. Crear la referencia con useRef
    console.log('loading aqui.... ' +loading);
  const formikRef = useRef<FormikProps<crearNotificacionDTO>>(null);
  //Función que ejecuta la inserción de registros en la DB
  const handleSubmit = async (values: crearNotificacionDTO) => {
    setLoading(true);
    console.log(`En el handleSubmit!!! URL: ${urlNotificaciones}`);
    try {
      const datosAEnviar = {
      ...values,
      fechaBitacora: convertirFechaAISO(values.fechaBitacora),
      fechaAcuse: convertirFechaAISO(values.fechaAcuse),
      fechaRegistro: convertirFechaAISO(values.fechaRegistro)
    };
    console.log('📤 Datos a enviar!!!!:', datosAEnviar);
        // Envío usando Axios
    const response = await axios.post(urlNotificaciones, datosAEnviar, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 3000, // 3 segundos de timeout
    });
    // ✅ Success
    console.log('Respuesta del servidor:', response.data);
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Notificación Registrada Correctamente',
      showConfirmButton: false,
      timer: 2000
    }).then (()=>{
              // 2. Usar la ref para resetear el formulario después del éxito
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
    });
    return response.data;

  } catch (error) {
  const errorMessage = handleApiError(error);
  Swal.fire('Error', errorMessage, 'error');
  throw error;
  } finally {
    setLoading(false);
  }
};

  return(
    
    <>
    <div className="container">
      <h5>
        Crear Nueva Notificación
      </h5>      
      <NotificacionForm 
          onHandleSubmit={handleSubmit}
          loading={loading}       
          formRef={formikRef}    
        />

    </div>
    </>
  )
}
  
export default CrearNotificacion;