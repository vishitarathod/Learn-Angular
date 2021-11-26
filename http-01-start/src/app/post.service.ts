import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";
@Injectable({providedIn:'root'})
export class PostsService{
    error=new Subject<string>();
    constructor(private http: HttpClient) {}
    createAndStorePost(title:string,content:string){
        const postData:Post={title,content}
        this.http.post<{name:string}>('https://angular-project-bab62-default-rtdb.firebaseio.com/posts.json',postData
        ,{
            observe:'response'
        })
        .subscribe(response=>{
          console.log(response);
        },error=>{
            this.error.next(error.message)
        })
    }
}