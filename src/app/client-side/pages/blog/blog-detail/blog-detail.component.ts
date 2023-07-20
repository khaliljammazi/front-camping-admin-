import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment ';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'console';
import { UserService } from 'src/app/services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  Post: Post = new Post();
comments : Comment[] = [];
comment:any = {};
currentRate = 0;
loading = false;
postrating = 0;


  constructor(
    private route : ActivatedRoute,
    private CommentService: CommentService,
    private PostService: PostService,
    private sanitizer: DomSanitizer,
    private userservice: AuthService 
  
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      {
        next: (params: any) => {
          this.PostService.getPostById(params.id).subscribe(
            {
              next: (data: any) => {
                this.Post = data;
                
              }
            }
          )

          this.CommentService.getComment().subscribe(
            {
              next: (data: any) => {
                this.comments = data.filter((comment: any) => {
                  return comment.post.id == params.id;
                }).filter((comment: any) => {
                  return comment.active == true;
                }
                )
                this.postrating = this.comments.reduce((sum: any, comment: any) => {
                  return sum + comment.rating;
                }
                , 0) / this.comments.length;


              }
            }
          )
        }
      }
    )
  }
  getSanitizedContent(details:string){
    return this.sanitizer.bypassSecurityTrustHtml(details);
  

}
add(){

  this.comment.id = 0;
  this.comment.details = this.comment.details;
  this.comment.rating = this.currentRate;
  this.comment.user = {
    id: this.userservice.currentUser().id || 1

  }
  this.comment.post = {
    id: this.Post.id
  }
  this.comment.active = true;
  this.loading = true;
  this.CommentService.addComment(this.comment).subscribe(
    {
      next: (data: any) => {
        this.comments.push(data);
        this.comment = {};
        this.currentRate = 0;
        this.loading = false;
        
    
      },
      error: (error: any) => {
        console.log(error);
      }

      
    }
  )

}

}