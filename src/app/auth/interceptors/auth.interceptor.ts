import { HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
 
    const token = inject(AuthService).token();
    const newReq = req.clone({
      headers: req.headers.append( 'Authorization',`Bearer ${token}`),
    });
    return next(newReq).pipe(tap((event) => {
          if (event.type === HttpEventType.Response) {
            console.log(req.url, 'returned a response with status', event.status);
          }
        }));

   
}