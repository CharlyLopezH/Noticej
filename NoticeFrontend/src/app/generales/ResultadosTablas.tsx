const ResultadosTablas=(props:ResultadosTablasProps)=>{


return (
<>
{props.totalDeRegistros === 0 && (
  <code>No se encontraron registros {props.searchTerm && `para: "${props.searchTerm}"`}</code>
)}

{props.totalDeRegistros > 0 && props.searchTerm && (
  <code>Total de Registros: {props.totalDeRegistros} {` filtrando por: ("${props.searchTerm}")`}</code>
)}

{props.totalDeRegistros > 0 && !props.searchTerm && (
  <code className="my-text-sm">Mostrando {props.totalDeRegistros} Registros totales, {` en ${props.totalDePaginas} página(s)`}</code>
)}
</>
);


}
export default ResultadosTablas;
interface ResultadosTablasProps {
totalDeRegistros:number
searchTerm:string
totalDePaginas:number
}