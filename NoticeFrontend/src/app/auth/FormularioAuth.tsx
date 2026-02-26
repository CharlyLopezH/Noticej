import { Form, Formik, type FormikHelpers } from "formik";
import type { credencialesUsuario } from "./auth.model";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import FormGroupText from "../../utils/FormGroupText";
import Button from "../../utils/Button";
import type { CSSProperties } from "react";

export default function FormularioAuth(props: formularioAuthProps){

   // Estilo común para ambos elementos
    const buttonBaseStyle: CSSProperties = {
        width: '100px',
        height: '40px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'normal',
        padding: '0 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        marginBottom:'3px'
    };

    

    return (
        <>
        <div className="centered-container">
        <div className="form-wrapper" style={{backgroundColor: '#f1f1f1'}}>

        <h3 style={{                      
                    maxWidth:'100%',    
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',      
                    marginBottom:'0'                      
                    }}>{props.titulo}</h3>
                    <hr style={{margin:'1px', height:'10px'}}/>
        <Formik initialValues={props.modelo}
        onSubmit={props.onSubmit} 
         validationSchema={Yup.object({
             email: Yup.string().required('Este campo es requerido')
                .email('Debe colocar un email válido'),
            password: Yup.string().required('Este campo es requerido')
         })}
        >

           {formikProps => (
              <Form>
                   <FormGroupText label="Email: " campo="email" />
                   <FormGroupText label="Contraseña:" campo="password" type="password" />

                   <div style={{                      
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',        
                    //backgroundColor: '#f0f0f0' // solo para verificar que el estilo se aplica
                    }}>
                       <Button 
                           disabled={formikProps.isSubmitting} 
                           type="submit"
                           className="btn btn-primary mb-2"  
                           style={{
                               ...buttonBaseStyle,
                               backgroundColor: '#007bff',
                               color: 'white',
                               
                            }}
                            >
                        <i className="bi bi-arrow-return-left me-1"></i>
                           {props.textoBoton}
                       </Button>                                              
                    </div>
                       
                       {/* <Link 
                           to="/" 
                           className="btn btn-secondary"
                           style={{
                               ...buttonBaseStyle,
                               backgroundColor: '#6c757d',
                               color: 'white',   
                               width:'80px'                            
                           }}
                       >
                           Cancelar
                       </Link> */}
               </Form>
           )} 
        </Formik>        
        </div>
        </div>
        </>
    )
}

interface formularioAuthProps{
    modelo: credencialesUsuario;
    onSubmit(valores: credencialesUsuario, acciones: FormikHelpers<credencialesUsuario>): void;
    titulo:string;
    textoBoton:string;
}