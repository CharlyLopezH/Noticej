const MostrarErrores=(props: mostrarErroresProps)=>{
    const style= {color: 'red'}
    return(
        <>
            {props.errores? <ul style={style}>
                {props.errores.map((error, indice) => <li key={indice}>{error}</li>)}
            </ul> : null}
        </>
    )
}
export default MostrarErrores;

interface mostrarErroresProps{
    errores?: string[];
}