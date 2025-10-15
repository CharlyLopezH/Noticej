//Componente de selección de cantidad de registros por página; facilita la visualización de datos en pantalla (grid/tabla)
import { type ChangeEvent } from "react";

const SelectOpcionesRegsPorPag=(props:SelectOpcionesRegsPorPagProps)=>{

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(event.target.value, 10);
        //console.log(`handleChange del componente de Seleccioanr opc newValue:  ${newValue}`);
        props.onChangeRecords(newValue);
    if (props.resetPage) props.resetPage(); // Resetear página si existe la función
  }

return(
      <div>        
        <select
          className="form-select form-select-sm"
          value={props.value}
          onChange={handleChange}
        >
          {props.opciones?.map(opcion => (
            <option key={opcion} value={opcion}>
              Mostrar {opcion}
            </option>
          ))}
        </select>
      </div>
)    
}
export default SelectOpcionesRegsPorPag;

interface SelectOpcionesRegsPorPagProps {  
  value:number
  defaultValue?:number
  opciones: number[]
  onChangeRecords: (value: number) => void;
  resetPage?: () => void;
}