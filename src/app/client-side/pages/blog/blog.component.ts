import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/Comment ';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  listofpostwithcomment: any[] = [];
  listofcomment: Comment[] = [];
 resentpost: any[] = [];
  top3tags: any[] = [];
  listofactivtyincamp: any[] = [];
  
  searchTerm = '';
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private PostService: PostService,
    private CommentService: CommentService
  ) { }

  ngOnInit(): void {
this.loaderview();


  

   


  }
  loaderview() {  
    this.PostService.getPost().subscribe(
      {
        next: (data: any) => {
          const filteredposts = data.filter((post: Post) => {
            return post.active == true;
          });
          const listofpostfiltred = filteredposts.map((post: Post) => {
            return { post: post, comment: [] };
          }
          );
          this.CommentService.getComment().subscribe(
            {
              next: (data: any) => {
                data.filter((comment: Comment) => {
                  if (comment.post.active == true) {
                    listofpostfiltred.filter((post: any) => {
                      if (comment.post.id == post.post.id) {
                        post.comment.push(comment);
                      }
                    }
                    )
                  }

                }
                )
                this.listofpostwithcomment = listofpostfiltred;
              

               
                // resent post
                this.resentpost = this.listofpostwithcomment.sort((a: any, b: any) => {
                  return b.post.created_at - a.post.created_at;
                }
                ).slice(0, 3);
                 //top tags
                  const listoftags = this.listofpostwithcomment.map((post: any) => {
                    return post.post.tags;
                  }
                  );

                  const tagFrequency = listoftags.reduce((tagFrequency: any, tag: any) => {
                    tag.forEach((tag: any) => {
                      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
                    });
                    return tagFrequency;
                  }
                  );
                  console.log(tagFrequency);
         
                  const sortedTags = Object.keys(tagFrequency).sort((a, b) => tagFrequency[b] - tagFrequency[a]);
                  // Get the top 3 tags
             
                  this.top3tags = sortedTags.slice(0, 3);
                  console.log(this.top3tags);
                  

                
                 




              }

            }

          );

        }

      }
    );
  }
 

          

  getSanitizedContent(details:string){
      return this.sanitizer.bypassSecurityTrustHtml(details);
    
  
  }


 searchData(searchTerm: string): void {
  if (searchTerm == '') {

    
    this.loaderview();
    
    return;
  }
  this.listofpostwithcomment = this.listofpostwithcomment.filter((post: any) => {
    return post.post.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
  );
 
  }
  filtredbytag(tag: string) {
    if (tag == '') {
      this.loaderview();
      return;
    }
    this.listofpostwithcomment = this.listofpostwithcomment.filter((post: any) => {
      return post.post.tags.includes(tag);
    }
    );
  }



}
