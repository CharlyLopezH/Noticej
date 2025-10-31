import React from "react";
import type { claim } from "./auth.model";

// Definición del tipo
type AuthContextType = {
    claims: claim[];
    actualizar: (claims: claim[]) => void;
};

// Crear el contexto con el tipo
const AutenticacionContext = React.createContext<AuthContextType>({
    claims: [],
    actualizar: () => {}
});
export default AutenticacionContext;