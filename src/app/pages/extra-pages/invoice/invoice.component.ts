import { Component, Input, OnInit } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { Invoice } from "./invoice.model";
import { ReservationService } from "src/app/services/reservation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Reservation } from "src/app/models/Reservation";
import { Activity } from "src/app/models/Activity";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  invoiceData!: Invoice;
  reservation!: any;
  listactivty: Activity[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ReservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Show Reservation", path: "/" },
      { label: "Print Reservation", path: "/", active: true },
    ];
    this._fetchData();
    this._fetchreservation();
  }

  /**
   * fetches invoice data
   */
  _fetchData(): void {
    this.invoiceData = {
      notes:
        "All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above",
      items: [],
    };
  }
  _fetchreservation(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.ReservationService.getReservationById(Number(id)).subscribe({
      next: (reserv: Reservation) => {
        this.reservation = reserv;
        console.log(this.reservation);
        this.listactivty = reserv.activities;
      },
    });
  }
}
