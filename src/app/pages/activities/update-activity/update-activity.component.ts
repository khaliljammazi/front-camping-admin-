import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as filestack from 'filestack-js';
import { relative } from 'path';
import { ActivitiesService } from 'src/app/services/activities.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit {
  filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
  pageTitle: BreadcrumbItem[] = [];
   act!: FormGroup;
   files: File[] = [];
  
   selectedActivity: any[] = [];
   constructor(
     private fb: FormBuilder,
     private sanitizer: DomSanitizer,
     private activityService: ActivitiesService,
     private router: Router,
     private route: ActivatedRoute
  
  
   ) { }
   
 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.activityService.getById(params['id']).subscribe(
      {
      next: (data: any) => {
        this.act.patchValue(data);
        //make active checkbox checked
        if (data.active == true) {
          this.act.patchValue({ active: 'true' });
        } else {
          this.act.patchValue({ active: 'false' });
        }
      },
    }
    
    );
  });
  
     this.pageTitle = [{ label: 'Activity', path: '/' }, { label: 'update activity', path: '/', active: true }];
  
  // product form
  this.act = this.fb.group({ 
    id: ['', Validators.required],
   label: ['', Validators.required],
   location: ['', Validators.required],
   discount: ['', Validators.required],
   description: ['', Validators.required],
   price: ['', Validators.required],
   active: ['', Validators.required],
   image: ['', Validators.required] ,
    telephone: ['', Validators.required],
    activities: ['', Validators.required]
  
  
  });
  

  this.selectedActivity = [
   {
     id: '1',
     label: 'activity 1',
     image: 'https://loremflickr.com/320/240'
   }
  ];
  
  }
  
   // convenience getter for easy access to form fields
   get form1() { return this.act.controls; }
  
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
               this.act.patchValue({ image: result.url });
  
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
  
     this.activityService.updateAct(this.act.value).subscribe(
       
    next => {
         Swal.fire({
           title: 'Success',
           text: 'act updated successfully.',
            icon: 'success',
         });
         this.act.reset();
         this.router.navigate(['../../'],{relativeTo:this.route});
       },
       error => {
         console.error('There was an error!', this.act.value, error);
         Swal.fire({
           title: 'Error',
           text: 'An error occurred while updating the activity.',
           icon: 'error',
         });
       }
     );
   }
  
  }
  