import { useContext, useEffect, useState, type ReactElement } from "react"
import AutenticacionContext from "./AutenticacionContext";

const Autorizado=(props:AutorizadoProps)=>{

    //El usuario está autorizado
    const [userAutorizado, SetUserAutorizado]=useState(true);
    const {claims} = useContext(AutenticacionContext);

    useEffect(()=>{
        if(props.role){
            //Verificación del rol del usuario
            const indice = claims.findIndex(claim=>
                        claim.nombre==='role' && claim.valor===props.role)    
                        SetUserAutorizado(indice > -1);
        } else {
            SetUserAutorizado(claims.length>0);
        }
    },[claims,props.role])
    
    return(
        <>
            {userAutorizado ? props.autorizado : props.noAutorizado}
        </>
    )

}
export default Autorizado

interface AutorizadoProps {
    autorizado: ReactElement;
    noAutorizado?:ReactElement;
    role?:string;
}