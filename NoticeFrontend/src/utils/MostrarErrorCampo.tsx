const MostrarErrorCampo=(props: mostrarErrorCampoProps)=>{
    return (
        <div className="text-danger">{props.mensaje}</div>
    )
}

export default MostrarErrorCampo

interface mostrarErrorCampoProps{
    mensaje: string;
}