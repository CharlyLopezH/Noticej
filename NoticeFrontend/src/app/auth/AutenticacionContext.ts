//Contexto para dar el servicio de claims
import React from "react";
import type { claim } from "./auth.model";


// Crear el contexto con el tipo
const AutenticacionContext = React.createContext<{
claims: claim[];
actualizar(claims:claim[]):void;
}>({claims:[], actualizar:()=>{}})
    
export default AutenticacionContext;