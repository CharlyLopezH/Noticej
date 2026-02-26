import { useContext, useEffect, useState, type ReactElement } from "react"
import AutenticacionContext from "./AutenticacionContext";

const Autorizado=(props:AutorizadoProps)=>{
    const [estaAutorizado, setEstaAutorizado]=useState(true); //Esto debe venir de un claim
    const {claims} = useContext(AutenticacionContext);
    
    //Este use controla si un usuario está o no autorizado
    useEffect(() => {
        if (props.role) {
            const indice = claims.findIndex(claim =>
                claim.nombre === 'role' && claim.valor === props.role)
            setEstaAutorizado(indice > -1);
        } else {
            setEstaAutorizado(claims.length > 0);
        }
    }, [claims, props.role])
    
    return(
        <>
            {estaAutorizado ? props.autorizado : props.noAutorizado} 
        </>
    )

}
export default Autorizado

interface AutorizadoProps {
 autorizado: ReactElement;
 noAutorizado?:ReactElement;
 role?:string;
}