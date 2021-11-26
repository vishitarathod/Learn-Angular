import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { map, tap } from "rxjs/operators";

// export class AuthInterceptorService implements HttpInterceptor{
//     intercept(req:HttpRequest<any>,next:HttpHandler){
//         // if(req.url)
//         console.log('request is on its way');
//         console.log(req.url);
//         const modifiedReq=req.clone({headers:req.headers.append('auth','key')})
//         return next.handle(modifiedReq).pipe(tap(event=>{
//             console.log(event);
//             if(event.type===HttpEventType.Response){
//                 console.log(event.body);
//             }
//          } ));
//     }
// }
export class AuthInterceptorService implements HttpInterceptor{
        intercept(req:HttpRequest<any>,next:HttpHandler){
            const modifiedReq=req.clone({headers:req.headers.append('auth','key')})
            return next.handle(modifiedReq)
        }
    }