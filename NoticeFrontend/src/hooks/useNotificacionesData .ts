//Hook personalizado para obtener un response de la data de un API
import type { AxiosResponse } from "axios";
import {useEffect, useState} from "react";
import type { notificacionDTO } from "../models/notificaciones.model";
import axios from "axios";
import useAxiosErrorHandler from "../helpers/useAxiosErrorHandler";


//Debe retornar un response.data con los datos a mostrar en la tabla del componente primario.
const useNotificacionesData=(props: useNotificacionesDataProps)=>{

    const [data, setData] = useState<notificacionDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalDeRegistros, setTotalDeRegistros] = useState<number>(0);
    const [totalDePaginas, setTotalDePaginas] = useState<number>(0);    
    const [error, setError] = useState<string | null>(null);

    const {showErrorAlert, getErrorMessage} = useAxiosErrorHandler();


//Experimental ****
    console.log(props.apiURL+ ' props.API Dentro del hook useNotificacionesData');
///    
    //Variables para el buscador
    let urlBase = `${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`; //Funcional sin searchTerm!! importante        
    //Todo bien, a menos que el searchTerm no esté en blanco
    if (props.searchTerm && props.searchTerm.trim()!=='') { //Aquí viene una variable en el input           
        urlBase= `${props.apiURL}/buscarNotificaciones/${props.searchTerm}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`
        console.log(`urlBase Cambiada para filtrar!! ${urlBase}`);
    } 
    // Función asíncrona para la conexión con el API de acceso a datos
    const recuperarData = async () => {
        try { 
            //console.log(`En axios usando la siguiente  ${props.apiURL} searchTerm: ${props.searchTerm}`);
            console.log(`urlBase que ejecutará AXIOS!!!: ${urlBase}`);
            setLoading(true);   
            setError(null);            
            const response: AxiosResponse<notificacionDTO[]> = await axios.get(urlBase);                 
            const totalData = parseInt(response.headers["cantidadtotalregistros"], 10);
            setData(response.data);
            setTotalDeRegistros(totalData);
            setTotalDePaginas(Math.ceil(totalData / props.recordsPorPagina));
            
        } catch (error) {

            //alert ('error antes de llamar al hook '+ error);
            //showErrorAlert(error);

            // ✅ Ahora sí funciona
            showErrorAlert(error);
            const errorMessage = getErrorMessage(error);
            console.log('Mensaje procesado:', errorMessage);
            
          
        } finally {
            setLoading(false);
        }
    };

     useEffect(() => {
         recuperarData();
     }, [props.recordsPorPagina,props.pagina,props.apiURL]); 


    // Retornamos todo lo necesario
    return {        
        data,
        loading,
        totalDeRegistros,
        totalDePaginas,
        error,
        recuperarData,    
        //errorMessage                            
    };
};

export default useNotificacionesData; 
interface useNotificacionesDataProps {
 pagina:number   
 apiURL:string  //Viene desde el index, componente padre
 cargando:boolean
 recordsPorPagina:number
 searchTerm : string// ✅ Nuevo parámetro 
 ejecutarBusquedaCadena:(cadena:string)=>void;
}


