export interface claim {
    nombre: string;
    valor: string;
}

export interface credencialesUsuario{
    email: '';
    password: '';   
}

export interface respuestaAutenticacion {
    token: string;
    expiracion: Date;
}

export interface usuarioDTO{
    id: string;
    email: string;
}