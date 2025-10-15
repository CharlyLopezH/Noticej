
import Swal from "sweetalert2";

const useAxiosErrorHandler = () => {
 
    const showErrorAlert = (error: unknown) => {
        const errorInfo = parseError(error);
        const userMessage = getUserFriendlyMessage(errorInfo);                

        Swal.fire({
            icon: "error",
            title: "Sin acceso al servicio de obtención de datos",
            text: `🚨 Axios ${errorInfo?.code}🚨`,
            //footer: `${error|| 'N/A'} 🚨 Servicio API, notificar a Soporte Técnico`,                        
            footer:userMessage
        });
    };

    const getErrorMessage = (error: unknown): string => {
        const errorInfo = parseError(error);
        return getUserFriendlyMessage(errorInfo);
    };

    const parseError = (error: unknown): any => {
        if (typeof error === 'string') {
            return { message: error };
        }
        
        if (error instanceof Error) {
            return { 
                message: error.message,
                code: (error as any).code,
                status: (error as any).response?.status
            };
        }
        
        if (error && typeof error === 'object') {
            const axiosError = error as any;
            return {
                message: axiosError.message || axiosError.response?.data?.message,
                code: axiosError.code,
                status: axiosError.response?.status
            };
        }
        
        return { message: 'Error desconocido' };
    };

    const getUserFriendlyMessage = (errorInfo: any): string => {
        const { code, status, message } = errorInfo;

        if (code === 'ERR_NETWORK') {
            return `Error de acceso al backend, notificar a soporte técnico.`;
        }
        
        if (code === 'NETWORK_ERROR' || code === 'ECONNREFUSED') {
            return "Problema de conexión. Verifica conexión a la red.";
        }
        if (status === 404) {
            return "El servicio solicitado no está disponible.";
        }
        if (status === 500) {
            return "Error interno del servidor. Intente más tarde.";
        }
        if (message?.includes('timeout')) {
            return "El servicio no respondió a tiempo.";
        }
        
        return `Error extraño ${code}`;
    };

    return { showErrorAlert, getErrorMessage };
};

export default useAxiosErrorHandler;