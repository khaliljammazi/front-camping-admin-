import { ReservationService } from "./../../../services/reservation.service";
import { Component, OnInit } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CampingCenter } from "src/app/models/CampingCenter";
import { Activity } from "src/app/models/Activity";
import { Reservation } from "src/app/models/Reservation";
import { CampCenterService } from "src/app/services/camp-center.service";
import { ActivitiesService } from "src/app/services/activities.service";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { Select2Data } from "ng-select2-component";
import emailjs  from '@emailjs/browser';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  newReservation!: FormGroup;
  Reservation: Reservation = new Reservation();
  listactivty: Activity[] = [];
  Listuser: User[] = [];
  filteredUsers: User[] = [];
  activityy: Select2Data = [];

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
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Reservation", path: "/" },
      { label: "Add Reservation", path: "/", active: true },
    ];


    this.userService.getAll().subscribe({
      next: (us: User[]) => {
        this.Listuser = us;

      },
    });

    this.newReservation = this.fb.group({
      numberReserved: ["", Validators.required],
      totalAmount: [0, Validators.required],
      dateStart: ["", Validators.required],
      dateEnd: ["", Validators.required],
      activities: ["", Validators.required],
      campingCenter: ["", Validators.required],
      user: ["", Validators.required],
      price: ["", Validators.required],
      discount: ["", Validators.required],
      nom: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      discount1: ["", Validators.required],
      price1: ["", Validators.required],
      campingPeriod: ["", Validators.required],
    });

    this.newReservation.controls["campingCenter"].valueChanges.subscribe(
      (value: any) => {
        this.CampCenterService.getCampingById(value).subscribe((res: any) => {
          this.newReservation.controls["price"].setValue(res.price);
          this.newReservation.controls["discount"].setValue(res.discount);
          this.listactivty = res.activities;

          this.newReservation.controls["activities"].valueChanges.subscribe(
            (value: any) => {
              this.activityService.getById(value).subscribe((res: any) => {
                this.newReservation.controls["price1"].setValue(res.price);
                this.newReservation.controls["discount1"].setValue(res.discount);
              });
            }
          );
        });
      }
    );

    // calculate camping period
    this.newReservation.controls["dateEnd"].valueChanges.subscribe(
      (value: any) => {
        let date1 = new Date(this.newReservation.controls["dateStart"].value);
        let date2 = new Date(value);
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        this.newReservation.controls["campingPeriod"].setValue(
          Difference_In_Days
        );
      }
    );
    // calcate total amount
    this.newReservation.controls["numberReserved"].valueChanges.subscribe(
      (value: any) => {
        console.log(value);
        const price_camp = this.newReservation.controls["price"].value;
        const price_activity = this.newReservation.controls["price1"].value;

        const discount_camp = this.newReservation.controls["discount"].value;
        const discount_activity =
          this.newReservation.controls["discount1"].value;
        const campingPeriod =
          this.newReservation.controls["campingPeriod"].value;
        if (price_activity == null) {
          this.totalAmount =
            (price_camp * campingPeriod - discount_camp) * value;
        } else {
          this.totalAmount =price_camp * campingPeriod -discount_camp +(price_activity * campingPeriod - discount_activity) * value;
        }
      }
    );

  
    this.newReservation.controls["user"].valueChanges.subscribe((value: any) => {
        this.newReservation.controls["email"].setValue(this.Listuser.filter((u) => u.id == value).pop()?.email);
      });

    this.CampCenterService.getCamps().subscribe(
      {
      next: (camp: CampingCenter[]) => {this.Listcamp = camp;},
    }
    );
  
  this.route.params.subscribe((params) => {
this.CampCenterService.getCampingById(params.id).subscribe((res: any) => {
  this.newReservation.controls["campingCenter"].setValue(res.label);
  this.newReservation.controls["price"].setValue(res.price);
  this.newReservation.controls["discount"].setValue(res.discount);
  this.listactivty = res.activities;
  this.newReservation.controls["activities"].valueChanges.subscribe(
    (value: any) => {
      this.activityService.getById(value).subscribe((res: any) => {
        this.newReservation.controls["price1"].setValue(res.price);
        this.newReservation.controls["discount1"].setValue(2);
      });
    }
  );
});
  });

  

    this.newReservation.controls["user"].setValue(this.authService.currentUser().nom);
    
    this.newReservation.controls["email"].setValue(this.authService.currentUser().email);


    // this.CampCenterService.getCamps().subscribe(
    //   {
    //   next: (camp: CampingCenter[]) => {this.Listcamp = camp;},
    // }
    // );
  

 
  
  
  }


  // convenience getter for easy access to form fields
  get form1() {
    return this.newReservation.controls;
  }

  onSubmit(): void {
    let user = this.Listuser.filter(
      (u) => u.id == Number(this.newReservation.controls["user"].value)).pop();
    if (user) delete user.authorities;
  
    const postFormData = {
      numberReserved: this.newReservation.controls["numberReserved"].value,
      campingPeriod: this.newReservation.controls["campingPeriod"].value,
      totalAmount: this.totalAmount,
      dateStart: this.newReservation.controls["dateStart"].value,
      dateEnd: this.newReservation.controls["dateEnd"].value,
      campingCenter: this.Listcamp.filter(
        (u) =>
          u.id == Number(this.newReservation.controls["campingCenter"].value)
      ).pop(),
      activities: this.Listcamp.filter((u) => u.id == Number(this.newReservation.controls["activities"].value)),
      user: user,
    };

    this.ReservationService.addReservation(postFormData).subscribe(
      (next) => {
        Swal.fire({
          title: "Success",
          text: "Reservation added successfully u gonna received an email check it please !",
          icon: "success",
        });
        let user = this.Listuser.filter(
          (u) => u.id == Number(this.newReservation.controls["user"].value)).pop();
        if (user) delete user.authorities;
        emailjs.init("nuCmof1hgHGy66rz_")
        emailjs.send("service_mcgqkne","template_2mr29j3",{
          nom:user?.nom,
          CampingCenter : this.newReservation.controls["campingCenter"].value,
          dateStart: this.newReservation.controls["dateStart"].value,
          totalAmount: this.totalAmount,
          });
        this.router.navigate(["reservation/camping-details/reservation/invoice/"+next.id]);
       
  
      },
      (error) => {
        console.error("There was an error!", this.newReservation.value, error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding the reservation.",
          icon: "error",
        });
      }
    );
  }
}