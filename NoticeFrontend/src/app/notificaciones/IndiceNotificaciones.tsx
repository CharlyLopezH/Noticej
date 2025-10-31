import { useCallback, useEffect, useState } from "react";
import { urlNotificaciones } from "../../utils/endpoints";
import Spinner from "../../utils/Spinner";
import useNotificacionesData from "../../hooks/useNotificacionesData ";
import TablaNotificaciones from "../notificaciones/TablaNotificaciones";
import BuscadorNotificaciones from "../notificaciones/BuscadorNotificaciones";
import Autorizado from "../auth/Autorizado";

const IndiceNotificaciones = () => {
  //Variables de estado
  const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
  const [recordsPorPagina, setRecordsPorPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiURL,setApiURL] = useState(urlNotificaciones); //apiUrl por defecto (sin filtrar)

  //Experimento para cambiar apiURL
  //const [modificarURL, setModificarURL]= useState(false);

  
// Actualiza solo el searchTerm; no tocar apiURL aquí
const handleSearchTermChange = (nuevoValor: string) => {
  setSearchTerm(nuevoValor);
  console.log("Nuevo searchTerm:", nuevoValor);
};


// Solo dispara la búsqueda cuando el usuario hace click en 🔍
const ejecutarBusquedaCadena = useCallback((cadena: string) => {
  if (cadena.trim() !== "") {
    //const urlBusqueda = `https://localhost:7015/notificaciones/buscarNotificaciones/${cadena}?`;
    const urlBusqueda = `${apiURL}/buscarNotificaciones/${cadena}?`;
    setApiURL(urlBusqueda);
    console.log("Ejecutando búsqueda con URL:", urlBusqueda);
  } else {
    setApiURL(urlNotificaciones);
  }
}, []);

  //Uso e invocación del hook personalizado que trae la data que requerirá la Tabla... **** Hook ***
  const {data,loading,totalDeRegistros,totalDePaginas,error, recuperarData,} = useNotificacionesData({
      //Props que requiere el  a enviar al hook
      apiURL: apiURL, //Url que va a decidir cual endpoint usar (con filtrado, normal y paginacion)
      cargando: true, //Se requiere controlar el spinner
      recordsPorPagina,
      pagina,
      searchTerm: searchTerm,
      ejecutarBusquedaCadena:ejecutarBusquedaCadena
  });
  
  //Funciones
  //useEffect(()=>{determinarApiURL},[searchTerm])

  useEffect(() => {
    recuperarData();
  }, [pagina,recordsPorPagina]);

    if (error) { //Si hay error
    return (<div>{" "}<Spinner mensaje={"Error cargando datos"} />{" "}</div>);
    } else if (loading) {  //Esperando la respuesta del fetch    
    return (<div>{" "}<Spinner mensaje={"loading"} />{" "}</div>);
   };   

    return (                
    <>        

    <Autorizado autorizado={<> Está Autorizado</>} 
                noAutorizado={<> Usuario No Autorizado</>}
                role={"adminis"}
    />  

    <div className="my-div-center-text">
    
      <code> Índice de Notificaciones </code>
    </div>
        <BuscadorNotificaciones
                apiUrl={apiURL}
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                pagina={pagina}
                recordsPorPagina={recordsPorPagina} 
                ejecutarBusquedaCadena={ejecutarBusquedaCadena}
        />    
         <TablaNotificaciones 
          data={data}
          totalDePaginas={totalDePaginas}
          pagina={pagina}
          setRecordsPorPagina={setRecordsPorPagina}
          setPagina={setPagina}
          recordsPorPagina={recordsPorPagina}
          totalDeRegistros={totalDeRegistros} 
          searchTerm={searchTerm}        />                
    </>           
        )
  
};

export default IndiceNotificaciones;