import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/Comment ';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  post:Post=new Post();
  listcomment :Comment[]= [];
  pageTitle: BreadcrumbItem[] = [];
  statusmsg: string = '';
  
  constructor(
    private route : ActivatedRoute,
    private sanitizer: DomSanitizer,
    private postService:PostService,
    private CommentService : CommentService
  
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'post', path: '/', active: true }];
    this.route.params.subscribe(params => {
      this.postService.getPostById(params['id']).subscribe(
        {
        next: (data: any) => {
          this.post=data;
        }
      }
      );
    }
    );
    this.CommentService.getComment().subscribe(
      {
        next: (data: any) => {
         data.filter((comment:Comment)=>{
            if(comment.post.id==this.post.id){
              this.listcomment.push(comment);
              console.log(this.listcomment);
            }
        
          }
          )
        }
      }
    );


    
  }

 changeStatusComment(id:number){
  
    this.CommentService.getCommentById(id).subscribe(
      {
        next: (data: Comment) => {
    
         const stat= data.active=!data.active;
         if (data.active == true) { 
          this.statusmsg = 'Active';
        } else {
          this.statusmsg = 'Inactive';
        } 
             let  upcomment={
            "id": data.id,
            "details": data.details,
            "rating": data.rating,
            "createdAt": data.createdAt,
            "user": {
              "id": data.user.id
            },
            "post": {
              "id": data.post.id
              },
            "active": stat
          }



         
          this.CommentService.updateComment(upcomment).subscribe(
            {
              next: (data: any) => {   
                console.log(data);
              }
            }
          );
        }
      }
    );
  }

  
  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.post.details);
  }


}
