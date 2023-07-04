import { ReservationService } from './../../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { DomSanitizer } from '@angular/platform-browser';
import * as filestack from 'filestack-js';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {
  
// Create a new instance of the Filestack client
filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
pageTitle: BreadcrumbItem[] = [];
 newReservation!: FormGroup;
 files: File[] = [];
 activity: Select2Data = [];

 selectedActivity: any[] = [];
 constructor(
   private fb: FormBuilder,
   private sanitizer: DomSanitizer,
   private ReservationService: ReservationService,
   private router: Router

 ) { }

 ngOnInit(): void {
   this.pageTitle = [{ label: 'Reservation', path: '/' }, { label: 'Add Reservation', path: '/', active: true }];

// product form
this.newReservation = this.fb.group({ 
  numberReserved: ['', Validators.required],
  totalAmount: ['', Validators.required],
  dateStart: ['', Validators.required],
  dateEnd: ['', Validators.required],
 activities: [this.selectedActivity, Validators.required],
 


});


//  activity
this.activity = [
 {
   id: '1',
   label: 'activity 1',
   value: { id:'1', label: 'activity 1' ,image: 'https://loremflickr.com/320/240'}
 },
 {
   id: '2',
   label: 'activity 2',
   value: {id:'2',label: 'activity 2' , Image: 'https://loremflickr.com/320/240'}
 },
 {
   id: '3',
   label: 'activity 3',
   value: {id :'3', label: 'activity 3' , Image: 'https://loremflickr.com/320/240'}
 }
  
];
this.selectedActivity = [
 {
   id: '1',
   label: 'activity 1',
   image: 'https://loremflickr.com/320/240'
 }
];

}

 // convenience getter for easy access to form fields
 get form1() { return this.newReservation.controls; }

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
             this.newReservation.patchValue({ image: result.url });

           })
           .catch((error) => {
             // Handle the upload error
             console.error('Filestack upload error:', error);
           });
       });
     }
   
 /**
  * add new members in selected members
  * @param event member data
  */
 AddActivity(event: any): void {
    const isAlreadySelected = this.selectedActivity.filter((item: any) => item.id === event.options[0].value.id);
   if (isAlreadySelected && isAlreadySelected.length === 0) {
     this.selectedActivity.push(event.options[0].value);
     event.options[0].disabled = true;

   } else {
     this.selectedActivity.splice(this.selectedActivity.indexOf(event.options[0].value), 1);
     event.options[0].disabled = false;

   }
 }
 removeActivity(index: number): void {
   this.selectedActivity.splice(index, 1);
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

   this.ReservationService.addReservation(this.newReservation.value).subscribe(
     
  next => {
       Swal.fire({
         title: 'Success',
         text: 'Reservation added successfully!',
         icon: 'success',
       });
       this.newReservation.reset();
       this.router.navigate(['/reservation']);
     },
     error => {
       console.error('There was an error!', this.newReservation.value, error);
       Swal.fire({
         title: 'Error',
         text: 'An error occurred while adding the reservation.',
         icon: 'error',
       });
     }
   );
 }

}
