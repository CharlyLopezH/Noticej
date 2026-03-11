import { Field, ErrorMessage } from "formik";

import MostrarErrorCampo from "./MostrarErrorCampo";

const FormGroupText=(props: formGroupTextProps)=> {
    return (
        <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%', maxWidth: '500px' }}>

            {props.label ? <label htmlFor={props.campo}>{props.label}</label> : null} 
            <Field type={props.type} name={props.campo} className="form-control"
            placeholder={props.placeholder}   
            autoComplete={props.type === 'password' ? 'new-password' : 'off'}  
            style={{  backgroundColor: 'white !important',
                      WebkitBoxShadow: '0 0 0 1000px white inset', // Truco para autocompletado en Chrome
                      boxShadow: '0 0 0 1000px white inset'
                    }}
            />
            <ErrorMessage name={props.campo}>{mensaje =>
                <MostrarErrorCampo mensaje={mensaje} />
            }</ErrorMessage>
        </div>
     </div>
    )
}

export default FormGroupText;

interface formGroupTextProps{
    campo: string;
    label?: string;
    placeholder?: string;
    type: 'text' | 'password';    
}

FormGroupText.defaultProps = {
    type: 'text'
}