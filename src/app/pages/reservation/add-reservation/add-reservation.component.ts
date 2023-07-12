import { ReservationService } from './../../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { Activity } from 'src/app/models/Activity';
import { Reservation } from 'src/app/models/Reservation';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {
  

pageTitle: BreadcrumbItem[] = [];
 newReservation!: FormGroup;
 Reservation: Reservation=new Reservation();
 listactivty:Activity[]=[];
 Listuser: User[] = [];

 files: File[] = [];

  selectedActivity: any[] = [];
 //
 Listcamp: CampingCenter[] = [];

 totalAmount: number = 0;
 constructor(
   private fb: FormBuilder,
   private sanitizer: DomSanitizer,
   private ReservationService: ReservationService,
   private CampCenterService: CampCenterService,
   private activityService: ActivitiesService,
   private router: Router
 ) { }

 ngOnInit(): void {
   this.pageTitle = [{ label: 'Reservation', path: '/' }, { label: 'Add Reservation', path: '/', active: true }];

// product form
this.newReservation = this.fb.group({ 
  numberReserved: ['', Validators.required],
  totalAmount: [0, Validators.required],
  dateStart: ['', Validators.required],
  dateEnd: ['', Validators.required],
 activities: ['', Validators.required],
 campingcenter: ['', Validators.required],
  price: ['', Validators.required],
  discount: ['', Validators.required],
  nom: ['', Validators.required],
  phone: ['', Validators.required],
  email: ['', Validators.required],
  discount1: ['', Validators.required],
  price1: ['', Validators.required] 



});
this.Listuser = JSON.parse(localStorage.getItem('users') || '{}');


this.newReservation.controls['campingcenter'].valueChanges.subscribe((value: any) => {
  this.CampCenterService.getCampingById(value).subscribe((res:any)=>{
    this.newReservation.controls['price'].setValue(res.price);
    this.newReservation.controls['discount'].setValue(2);
     this.listactivty=res.activities;
  
     this.newReservation.controls['activities'].valueChanges.subscribe((value: any) => {
      this.activityService.getById(value).subscribe((res:any)=>{
        this.newReservation.controls['price1'].setValue(res.price);
        this.newReservation.controls['discount1'].setValue(2);
      });
    });



});
});
// calcate number of days
this.newReservation.controls['dateEnd'].valueChanges.subscribe((value: any) => {
  let date1 = new Date(this.newReservation.controls['dateStart'].value);  
  let date2 = new Date(value);
  let Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  this.newReservation.controls['numberReserved'].setValue(Difference_In_Days);
  
}
);
// calcate total amount
this.newReservation.controls['numberReserved'].valueChanges.subscribe((value: any) => {
  console.log(value);
 const price_camp=this.newReservation.controls['price'].value;
  const price_activity=this.newReservation.controls['price1'].value;
  
  const discount_camp=this.newReservation.controls['discount'].value;
  const discount_activity=this.newReservation.controls['discount1'].value;
  if(price_activity==null){
    this.totalAmount=(price_camp*value-discount_camp);
  } else {  
  this.totalAmount=(price_camp*value-discount_camp)+(price_activity*value-discount_activity);
  }
}
);





this.CampCenterService.getCamps().subscribe(
  {
    next: (camp: CampingCenter[]) => {
      this.Listcamp = camp;
      
    }
  }
);
}


    // getActivitiesDetail(value: any) {
    //   this.ReservationService.getActiviteByCampincenter(value.id).subscribe((res:any)=>{
    //     this.activity=res;
    //     this.newReservation.controls['price'].setValue(res.price);
    //     this.newReservation.controls['discount'].setValue(2);
    //     this.newReservation.controls['totaAmount'].setValue(res.price*2-res.discount);
    //   },
    //   (error) => { console.error(' error:', error);
    // }
    //   )
    //     }
      setDiscount(value: any) {
        this.newReservation.controls['totaAmount'].setValue(this.newReservation.controls['price'].value*value-this.newReservation.controls['discount'].value);
      }

// ValidateActivityAdded() {
//   if (this.selectedActivity.length === 0) {
//     return true;
//   }
submitAction() {
let formData=this.newReservation.value;
let data={
  "name":formData.nom,
  "email":formData.email,
  "phone":formData.phone,
  "dateStart":formData.dateStart,
  "dateEnd":formData.dateEnd,
  "numberReserved":formData.numberReserved,
  "totalAmount":this.totalAmount.toString(),
  "activities":JSON.stringify(this.selectedActivity)

}
/* this.ReservationService.generateReport(data).subscribe((res:any)=>{
  this.ReservationService.getPDF(res).subscribe((res:any)=>{
   this.downloadFileFile(res.uuid);
   this.newReservation.reset();
   this.selectedActivity=[];
   this.totalAmount=0;
  },
  (error) => { console.error(' error:', error);
}
  )

})}
downloadFileFile(fileName:string) {
  var data ={
    "uuid":fileName
  }
  this.ReservationService.getPDF(data).subscribe((res:any)=>{
    saveAs(res,fileName + '.pdf');
  }) */
}
 // convenience getter for easy access to form fields
 get form1() { return this.newReservation.controls; }

 
 onSubmit(): void {
  const postFormData={
    "numberReserved":this.newReservation.controls['numberReserved'].value,
    "totalAmount":this.totalAmount,
    "dateStart":this.newReservation.controls['dateStart'].value,
    "dateEnd":this.newReservation.controls['dateEnd'].value,
    "campingcenter":this.CampCenterService.getCampingById(this.newReservation.controls['campingcenter'].value),
    "activities":this.activityService.getById(this.newReservation.controls['activities'].value),
    "user":{}
  }
  console.log(postFormData);


   this.ReservationService.addReservation(postFormData).subscribe(
     
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
