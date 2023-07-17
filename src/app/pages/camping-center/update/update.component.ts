import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { DomSanitizer } from '@angular/platform-browser';
import * as filestack from 'filestack-js';
import { CampCenterService } from 'src/app/services/camp-center.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
// Create a new instance of the Filestack client
filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
pageTitle: BreadcrumbItem[] = [];
 Camp!: FormGroup;
 files: File[] = [];
 activity: Select2Data = [];
 gmapConfig2: any;

 selectedActivity: any[] = [];
 constructor(
   private fb: FormBuilder,
   private sanitizer: DomSanitizer,
   private CampCenterService: CampCenterService,
   private router: Router,
   private route: ActivatedRoute


 ) { }

 ngOnInit(): void {

this.route.params.subscribe(params => {
  this.CampCenterService.getCampingById(params['id']).subscribe(
    {
    next: (data: any) => {
      this.Camp.patchValue(data);
    const alt=parseFloat(data.location.split(',')[0]);
    const lng =parseFloat(data.location.split(',')[1]);
     
      this.gmapConfig2 = {
        lat:alt,
        lng: lng,
        markers: [
          { lat: alt,
             lng: lng,
             title : data.label ,
             draggable: true }
      
        ]
      };

      //make active checkbox checked
      if (data.active == true) {
        this.Camp.patchValue({ active: 'true' });
      } else {
        this.Camp.patchValue({ active: 'false' });
      }
      
    },
  }
  
  );
});

   this.pageTitle = [{ label: 'Camp-Center', path: '/' }, { label: 'update Camp', path: '/', active: true }];

// product form
this.Camp = this.fb.group({ 
  id: ['', Validators.required],
 label: ['', Validators.required],
 location: ['', Validators.required],
 discount: ['', Validators.required],
 description: ['', Validators.required],
 price: ['', Validators.required],
 active: ['', Validators.required],
 image: ['', Validators.required] ,
  telephone: ['', Validators.required],
  capacity: ['', Validators.required],


});



}

 // convenience getter for easy access to form fields
 get form1() { return this.Camp.controls; }

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
             this.Camp.patchValue({ image: result.url });

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

   this.CampCenterService.updateCamp(this.Camp.value).subscribe(
     
  next => {
       Swal.fire({
         title: 'Success',
         text: 'Camp updated successfully.',
          icon: 'success',
       });
       this.Camp.reset();
       this.router.navigate(["../../"], {relativeTo: this.route});
     },
     error => {
       console.error('There was an error!', this.Camp.value, error);
       Swal.fire({
         title: 'Error',
         text: 'An error occurred while updating the Camp.',
         icon: 'error',
       });
     }
   );
 }
 markerDragEnd(event: any, marker: any): void {
  const updatedLat = event.latLng.lat();
  const updatedLng = event.latLng.lng();
  marker.lat = updatedLat;
  marker.lng = updatedLng;
  console.log('new', event, marker);
  this.Camp.patchValue({ location:  `${updatedLat},${updatedLng}`  });
  
 

}


}

