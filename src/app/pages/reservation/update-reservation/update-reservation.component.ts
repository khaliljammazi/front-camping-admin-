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
import { User } from 'src/app/models/user';
import { Activity } from 'src/app/models/Activity';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CampingCenter } from 'src/app/models/CampingCenter';

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
 Listuser: User[] = [];
 totalAmount: number = 0;
 Listcamp: CampingCenter[] = [];
 listactivty: Activity[] = [];
 
 constructor(
   private fb: FormBuilder,
   private sanitizer: DomSanitizer,
   private ReservationService: ReservationService,
   private CampCenterService: CampCenterService,
   private activityService: ActivitiesService,
   private router: Router,
   private route:ActivatedRoute,
   private authService: AuthService,
   private userService: UserService
 ) { }

 ngOnInit(): void {
   this.pageTitle = [{ label: 'Reservation', path: '/' }, { label: 'update Reservation', path: '/', active: true }];
   this.route.params.subscribe(params => {
    this.ReservationService.getReservationById(params['id']).subscribe(
      {
        next: (Reservation: Reservation) => {
          this.Reservation = Reservation;
          this.editReservation.patchValue(this.Reservation);
        this.editReservation.controls["campingCenter"].setValue(this.Reservation.campingCenter.id);
        this.editReservation.controls["user"].setValue(this.Reservation.user.id);
        this.editReservation.controls["activities"].setValue(this.Reservation.campingCenter.activities.map((activity: Activity) => activity.id));
        console.log(this.Reservation);


    
        },
        error: (error) => console.log(error)
      }
    )
   
  }
  )
this.editReservation = this.fb.group({ 
  id: [""],
  numberReserved: ["", Validators.required],
  totalAmount: ["", Validators.required],
  dateStart: ["", Validators.required],
  dateEnd: ["", Validators.required],
  activities: ["", Validators.required],
  campingCenter: ["", Validators.required],
  user: ["", Validators.required],
  price: ["", Validators.required],
  discount: ["", Validators.required],
  nom: ["", Validators.required],
  email: ["", Validators.required],
  discount1: ["", Validators.required],
  price1: ["", Validators.required],
  campingPeriod: ["", Validators.required],
  
});



this.editReservation.controls["campingCenter"].valueChanges.subscribe(
  (value: any) => {
    this.CampCenterService.getCampingById(value).subscribe((res: any) => {
      this.editReservation.controls["price"].setValue(res.price);
      this.editReservation.controls["discount"].setValue(res.discount);
      this.listactivty = res.activities;

      this.editReservation.controls["activities"].valueChanges.subscribe(
        (value: any) => {
          this.activityService.getById(value).subscribe((res: any) => {
            this.editReservation.controls["price1"].setValue(res.price);
            this.editReservation.controls["discount1"].setValue(res.discount);
          });
        }
      ); 
    });
  }
);
 this.editReservation.controls["user"].valueChanges.subscribe(
    (value: any) => {
      this.userService.getById(value).subscribe((res: any) => {
        this.editReservation.controls["nom"].setValue(res.nom);
        this.editReservation.controls["email"].setValue(res.email);
      });
    }
  );

// calculate camping period
this.editReservation.controls["dateEnd"].valueChanges.subscribe(
  (value: any) => {
    let date1 = new Date(this.editReservation.controls["dateStart"].value);
    let date2 = new Date(value);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.editReservation.controls["campingPeriod"].setValue(
      Difference_In_Days
    );
  }
);
// calculate total amount
this.editReservation.controls["numberReserved"].valueChanges.subscribe(
  (value: any) => {
    console.log(value);
    const price_camp = this.editReservation.controls["price"].value;
    const price_activity = this.editReservation.controls["price1"].value;

    const discount_camp = this.editReservation.controls["discount"].value;
    const discount_activity =
      this.editReservation.controls["discount1"].value;
    const campingPeriod =
      this.editReservation.controls["campingPeriod"].value;
    if (price_activity == null) {
      this.totalAmount =
        (price_camp * campingPeriod - discount_camp) * value;
    } else {
      this.totalAmount =price_camp * campingPeriod -discount_camp +(price_activity * campingPeriod - discount_activity) * value;
    }
  }
);

this.userService.getAll().subscribe({
  next: (us: User[]) => {
    this.Listuser = us.filter((user) => !user.roles.some((role) => role.name === 'ROLE_SUPER_ADMIN' || role.name === 'ROLE_ADMIN'));
  },
});



this.CampCenterService.getCamps().subscribe(
  {
  next: (camp: CampingCenter[]) => {this.Listcamp = camp;},
}
);

this.route.params.subscribe((params) => {
  this.CampCenterService.getCampingById(params.id).subscribe((res: any) => {
    this.editReservation.controls["campingCenter"].setValue(res.id);
    this.editReservation.controls["price"].setValue(res.price);
    this.editReservation.controls["discount"].setValue(res.discount);
    this.listactivty = res.activities;
   console.log(res.id);
   
  });
    });
  

    
  



}

 // convenience getter for easy access to form fields
 get form1() { return this.editReservation.controls; }


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


 
 onSubmit(): void {
  const id = this.route.snapshot.params['id'];
  let user = this.Listuser.filter(
    (u) => u.id == Number(this.editReservation.controls["user"].value)).pop();
  if (user) delete user.authorities;
  const postFormData = {
    id: this.Reservation.id, // Include the reservation ID
    active: this.Reservation.active, // Include the active status
    isConfirmed: this.Reservation.isConfirmed, // Include the isConfirmed status
    numberReserved: this.editReservation.controls["numberReserved"].value,
    campingPeriod: this.editReservation.controls["campingPeriod"].value,
    totalAmount: this.totalAmount,
    dateStart: this.editReservation.controls["dateStart"].value,
    dateEnd: this.editReservation.controls["dateEnd"].value,
    campingCenter: this.Listcamp.filter(
      (u) =>
        u.id == Number(this.editReservation.controls["campingCenter"].value)
    ).pop(),
    activities: this.Listcamp.filter((u) => u.id == Number(this.editReservation.controls["activities"].value)),
    user: user,
  };

  this.ReservationService.updateReservation(postFormData).subscribe(
  next => {
       Swal.fire({
         title: 'Success',
         text: 'Reservation updated successfully!',
         icon: 'success',
       });
       this.editReservation.reset();
       this.router.navigate(["../../"], {relativeTo: this.route});
     },
     error => {
       console.error('There was an error!', this.editReservation.value, error);
       Swal.fire({
         title: 'Error',
         text: 'An error occurred while editing the reservation.',
         icon: 'error',
       });
     }
   )

}
}