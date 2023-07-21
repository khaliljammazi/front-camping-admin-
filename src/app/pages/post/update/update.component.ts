import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { DomSanitizer } from '@angular/platform-browser';
import * as filestack from 'filestack-js';
import { CampCenterService } from 'src/app/services/camp-center.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
  pageTitle: BreadcrumbItem[] = [];
   Post!: FormGroup;
   files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
private PostService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private userservice:AuthService
  ) { }

  ngOnInit(): void {
    
this.route.params.subscribe(params => {
  this.PostService.getPostById(params['id']).subscribe(
    {
    next: (data: any) => {
      this.Post.patchValue(data);
      console.log(data);
    

      if (data.active == true) {
        this.Post.patchValue({ active: 'true' });
      } else {
        this.Post.patchValue({ active: 'false' });
      }
    }
  
});
});
this.pageTitle = [{ label: 'Posts', path: '/posts' }, { label: 'Update', active: true }];
// product form
this.Post = this.fb.group({
  id: [''],
  title: ['', Validators.required],
  details: ['', Validators.required],
  active: ['', Validators.required],
  image: ['', Validators.required],
  created_at: [''],

});
  }


  get form1() { return this.Post.controls; }
 
  /**
   *  adds new file in uploaded files
   */
 
    onSelect(event: any) {
      this.files.push(...event.addedFiles);
        // Upload the files using Filestack
        this.files.forEach((file) => {
          this.filestackClient.upload(file)
            .then((result) => {
              // Handle the successful upload
              console.log('Filestack upload result:', result);
              this.Post.patchValue({ image: result.url });
 
            })
            .catch((error) => {
              // Handle the upload error
              console.error('Filestack upload error:', error);
            });
        });
      }
    
 
  trackByItemID(index: number, a:any): number { return a.id; }
 
 
  /**
   *   removes file from uploaded files
   */
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
 
  /**
  * Formats the size
  */
  getSize(f: File) {
    const bytes = f.size;
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
 
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
 
 
  /**
   * Returns the preview url
   */
  getPreviewUrl(f: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(f)));
  }
  onSubmit(): void {
     
const regex = /#(\w+)/g;
const tags = [];
let match;
while ((match = regex.exec(this.Post.value.details))) {
  tags.push(match[1]);
}
const detailwithouttags = this.Post.value.details.replace(regex, '');
this.Post.patchValue({ details: detailwithouttags });
this.Post.patchValue({ tags: tags });

const date = new Date();
const created_at = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +
  date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
this.Post.patchValue({ created_at: created_at });
console.log(this.Post.value);
let  update={
  "id": this.Post.value.id,
  "title": this.Post.value.title,
  "details": this.Post.value.details,
  "active": this.Post.value.active,
  "image": this.Post.value.image,
  "tags": this.Post.value.tags,
  "user": {
    "id": this.userservice.currentUser().id}

}
console.log(update);



 
    this.PostService.updatePost(update).subscribe(
      
   next => {
        Swal.fire({
          title: 'Success',
          text: ' updated successfully.',
           icon: 'success',
        });
        this.Post.reset();
        this.router.navigate(['admin/post']);
      },
      error => {
        console.error('There was an error!', this.Post.value, error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating .',
          icon: 'error',
        });
      }
    );
  }




}
