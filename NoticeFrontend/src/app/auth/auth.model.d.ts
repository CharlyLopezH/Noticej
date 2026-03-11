//Estructuras (json) para definir diversos objetos en la aplicación
//claims-diccionarios para los permisos
export interface claim {
    nombre: string;
    valor: string;
}


//Login y registro de usuarios
export interface credencialesUsuario{
    email: '';
    password: '';   
}

//Confirma autenticación
export interface respuestaAutenticacion {
    token: string;
    expiracion: Date;
}

export interface usuarioDTO{
    id: string;
    email: string;
}