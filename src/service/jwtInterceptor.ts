import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "src/service/jwtService";

@Injectable({
    providedIn:'root'
})

export class JwtInterceptor implements HttpInterceptor{

    constructor(private autenticazione: JwtService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentuser = localStorage.getItem("currentUser");
        let token = localStorage.getItem("token");
        console.log(token);
        if (request.url.includes('micro1/user/login')) {
            // Salta l'interceptor e passa alla richiesta successiva senza modificarla
            return next.handle(request);
          }
          if (request.url.includes('micro1/user/register')) {
            // Salta l'interceptor e passa alla richiesta successiva senza modificarla
            return next.handle(request);
          }
          if (request.url.includes('micro2/prodotti/findById')) {
            // Salta l'interceptor e passa alla richiesta successiva senza modificarla
            return next.handle(request);
          }
          if (request.url.includes('micro2/prodotti/findAllByTypeFilter')) {
            // Salta l'interceptor e passa alla richiesta successiva senza modificarla
            return next.handle(request);
          }


        if(currentuser && token !== undefined)
        {

            request = request.clone({
                setHeaders: {
                    Authorization : `Bearer ${token}`
                }
            })
        }
        return next.handle(request);
    }

}
