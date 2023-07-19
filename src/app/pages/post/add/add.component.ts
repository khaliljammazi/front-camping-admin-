import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { DomSanitizer } from '@angular/platform-browser';
import * as filestack from 'filestack-js';
import Swal from 'sweetalert2';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

// Create a new instance of the Filestack client
filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
pageTitle: BreadcrumbItem[] = [];
 newPost!: FormGroup;
 files: File[] = [];
 activity: Select2Data = [];
 gmapConfig2: any;
 test: any;
 loader = false;
 user:User=new User();
  formpost: any;
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private PostService: PostService,
    private router: Router,
    private userservice:AuthService 

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Post', path: '/' }, { label: 'Add Post', path: '/', active: true }];
    this.newPost = this.fb.group({ 
      title: ['', Validators.required],
      details: ['', Validators.required],
      active: ['', Validators.required],
      image: ['', Validators.required],
  

     
    });
this.user= this.userservice.currentUser();
console.log(this.user);



 }
  
  get form1() { return this.newPost.controls; }

  /**
   *  adds new file in uploaded files
   */

    onSelect(event: any) {
      this.files.push(...event.addedFiles);
      this.loader = true;
        // Upload the files using Filestack
        this.files.forEach((file) => {
          this.filestackClient.upload(file)
            .then((result) => {
              this.loader = false;
              // Handle the successful upload
              console.log('Filestack upload result:', result);
              this.newPost.patchValue({ image: result.url });

            })
            .catch((error) => {
              this.loader = false;
              // Handle the upload error
              console.error('Filestack upload error:', error);
            });
        });
      }
    



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
  let id:number= this.user.id || 1;
  
const regex = /#(\w+)/g;
const tags = [];
let match;
while ((match = regex.exec(this.newPost.value.details))) {
  tags.push(match[1]);
}
const detailwithouttags = this.newPost.value.details.replace(regex, '');

//formpost 
this.formpost = {
  title: this.newPost.value.title,
  image: this.newPost.value.image,  
  details: detailwithouttags,
  tags: tags,
  active: this.newPost.value.active,
};

 



    this.PostService.addpostbyuserancamp(this.formpost,id).subscribe(
      
   next => {
        Swal.fire({
          title: 'Success',
          text: 'Camp added successfully!',
          icon: 'success',
        });
        this.newPost.reset();
        this.router.navigate(['admin/post']);
      },
      error => {
        console.error('There was an error!', this.newPost.value, error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding the camp.',
          icon: 'error',
        });
      }
    );
  }


}