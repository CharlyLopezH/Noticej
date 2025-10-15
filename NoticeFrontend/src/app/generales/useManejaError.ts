// hooks/useErrorHandler.ts
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

// Interfaz completa y corregida
export interface ErrorInfo {
  message: string;  // ✅ PROPiedad REQUERIDA
  code?: string;
  severity: 'error' | 'warning' | 'info';
  timestamp: Date;
}

const ManejaError = () => {
  const [error, setError] = useState<ErrorInfo | null>(null);

  console.log('Hubo errorrrrrr, error: '+error?.code);

  const handleApiError = useCallback((error: any): ErrorInfo => {
    let errorInfo: ErrorInfo;
console.log('Error Info '+error);
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response) {
        // Error del servidor
        const status = axiosError.response.status;
        errorInfo = {
          message: getServerErrorMessage(status, axiosError.response.data),
          code: `HTTP_${status}`,
          severity: status >= 500 ? 'error' : 'warning',
          timestamp: new Date()
        };
      } else if (axiosError.request) {
        // Error de conexión
        errorInfo = {
          message: 'No se pudo conectar con el servidor.',
          code: 'NETWORK_ERROR',
          severity: 'error',
          timestamp: new Date()
        };
      } else {
        // Error de configuración
        errorInfo = {
          message: 'Error en la configuración de la solicitud.',
          code: 'REQUEST_ERROR', 
          severity: 'error',
          timestamp: new Date()
        };
      }
    } else {
      // Error genérico
      errorInfo = {
        message: error.message || 'Error inesperado',
        code: 'UNKNOWN_ERROR',
        severity: 'error',
        timestamp: new Date()
      };
    }

    setError(errorInfo);
    return errorInfo;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleApiError,
    clearError
  };
};


export default ManejaError;

// Función auxiliar (igual que antes)
const getServerErrorMessage = (status: number, data: any): string => {
  const messages: { [key: number]: string } = {
    400: data?.message || 'Solicitud incorrecta.',
    401: 'No autorizado. Por favor, inicia sesión nuevamente.',
    403: 'No tienes permisos para acceder a este recurso.',
    404: 'El recurso solicitado no fue encontrado.',
    500: 'Error interno del servidor.',
    503: 'Servicio en mantenimiento.',
  };
  return messages[status] || `Error del servidor (${status})`;
};