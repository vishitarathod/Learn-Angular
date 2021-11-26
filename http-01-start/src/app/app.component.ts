import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map,catchError} from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Subscription,throwError } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy {
  loadedPosts:Post[] = [];
  isFetching=false;
  error=null;
  errorSub:Subscription

  constructor(private http: HttpClient,
    private postsService:PostsService ) {}

  ngOnInit() {
    // this.fetchPosts()
    this.errorSub=this.postsService.error.subscribe(errorMes=>{
      this.error=errorMes
    })
  }

  onCreatePost(postData:Post) {
    // Send Http request
    // console.log(postData);
   this.postsService.createAndStorePost(postData.title,postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.isFetching=true
    this.http.get<{[key:string]:Post}>('https://angular-project-bab62-default-rtdb.firebaseio.com/posts.json')
    .pipe(map((res/**:{[key:string]:Post} */)=>{
      const postArray:Post[]=[];
      for(const key in res){
        postArray.push({...res[key],id:key})
      }
      return postArray
    }),
    catchError(errorRes=>{
      //send to analytics server
     return throwError(errorRes)
    }))
    .subscribe(post=>{
      this.isFetching=false
      this.loadedPosts=post
    },error=>{
      this.error=error.message
    }
    )
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe()
  }
}
