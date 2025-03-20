import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
  catchError((error: HttpErrorResponse) => {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;

      // Intenta extraer el mensaje del cuerpo de la respuesta
      if (error.error && error.error.message) {
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.error && typeof error.error === 'string') {
        errorMessage = `Error: ${error.error}`;
      }
    }

    // Muestra el mensaje de error al usuario (puedes usar un servicio de notificación)
    alert(errorMessage);

    // Registra el error en la consola o en un servicio de logging
    console.error(errorMessage);

    // Lanza el error para que pueda ser manejado por el componente que hizo la petición
    return throwError(() => error);
  }))
};
