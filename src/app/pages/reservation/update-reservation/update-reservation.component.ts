import { Reservation } from 'src/app/models/Reservation';
import { ReservationService } from './../../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { DomSanitizer } from '@angular/platform-browser';
import * as filestack from 'filestack-js';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.scss']
})
export class UpdateReservationComponent implements OnInit {

// Create a edit instance of the Filestack client
filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
pageTitle: BreadcrumbItem[] = [];
 editReservation!: FormGroup;
 files: File[] = [];
 activity: Select2Data = [];
Reservation: Reservation=new Reservation();
 selectedActivity: any[] = [];
 constructor(
   private fb: FormBuilder,
   private sanitizer: DomSanitizer,
   private ReservationService: ReservationService,
   private router: Router,
   private route:ActivatedRoute
 ) { }

 ngOnInit(): void {
   this.pageTitle = [{ label: 'Reservation', path: '/' }, { label: 'update Reservation', path: '/', active: true }];
   this.route.params.subscribe(params => {
    this.ReservationService.getReservationById(params['id']).subscribe(
      {
        next: (Reservation: Reservation) => {
          this.Reservation = Reservation;
          this.editReservation.patchValue(this.Reservation);
    
        },
        error: (error) => console.log(error)
      }
    )
  }
  )
// product form
this.editReservation = this.fb.group({ 
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
 get form1() { return this.editReservation.controls; }

 /**
  *  adds edit file in uploaded files
  */

   onSelect(event: any) {
     this.files.push(...event.addedFiles);
       // Upload the files using Filestack
       this.files.forEach((file) => {
         this.filestackClient.upload(file)
           .then((result) => {
             // Handle the successful upload
             console.log('Filestack upload result:', result);
             this.editReservation.patchValue({ image: result.url });

           })
           .catch((error) => {
             // Handle the upload error
             console.error('Filestack upload error:', error);
           });
       });
     }
   
 /**
  * add edit members in selected members
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
  const reservationId = this.route.snapshot.params['id'];
   this.ReservationService.updateReservation(reservationId,this.editReservation.value).subscribe(
     
  next => {
       Swal.fire({
         title: 'Success',
         text: 'Reservation added successfully!',
         icon: 'success',
       });
       this.editReservation.reset();
       this.router.navigate(["../../"], {relativeTo: this.route});
     },
     error => {
       console.error('There was an error!', this.editReservation.value, error);
       Swal.fire({
         title: 'Error',
         text: 'An error occurred while adding the reservation.',
         icon: 'error',
       });
     }
   )

}
}