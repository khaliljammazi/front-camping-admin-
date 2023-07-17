import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';
import { DomSanitizer } from '@angular/platform-browser';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  records: Reservation[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];


  constructor( private reservationservice: ReservationService,private sanitizer: DomSanitizer,
    private router: Router,
    private route:ActivatedRoute )
   { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'reservation', path: '/', active: true }];
    this._fetchData();
    this.initTableCofig();
  }
   /**
   * fetches table records
   */
   _fetchData(): void {
    this.reservationservice.getReservation().subscribe(
      {
        next: (reserv: Reservation[]) => {
          this.records = reserv;
        
        },
        error: (err: any) => console.log(err)

      });

  }

  /**
   * initialize advanced table columns
   */
  initTableCofig(): void {
    this.columns = [
      {
        name: 'id',
        label: 'id',
        formatter: (record: Reservation) => record.id,
        width: 80,
      },
      {
        name: 'numberReserved',
        label: 'numberReserved',
        formatter: (record: Reservation) => record.numberReserved,
        width: 80,
      },
      {
        name: 'totalAmount',
        label: 'totalAmount',
        formatter: (record: Reservation) => record.totalAmount,
        width: 40,
      },

      {
        name: 'dateStart',
        label: 'dateStart',
        formatter: (record: Reservation) => record.dateStart,
        width: 80,
      },
      {
        name: 'dateEnd',
        label: 'dateEnd',
        formatter: (record: Reservation) => record.dateEnd,
        width: 80
      },
      {
        name: 'Activity',
        label: 'Activity',
        formatter: this.activityFormate.bind(this),
        width: 40
      },
      {
        name: 'campingCenter',
        label: 'campingCenter',
        formatter:this.CampFormatter.bind(this),
        width: 40
      },
      {
        name: 'user',
        label: 'user',
        formatter: this.userFormate.bind(this),
        width: 40
      },
      {
        name: 'status',
        label: 'status',
        formatter: this.reservationStatusFormatter.bind(this),
        width: 180,
      },
      {
        name: 'actions',
        label: 'actions',
        formatter:()=>{},
        width: 140,
      },
 
    ];
  }


 
  activityFormate(record: Reservation): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<p>${record.activities.map((activity) => activity.label)}</p>`

    );}
    CampFormatter(camp: Reservation): any {
      return this.sanitizer.bypassSecurityTrustHtml(`<p>${camp.campingCenter.label}</p>`);
    }
    
    
    userFormate(record: Reservation): any {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<p>${record.user.nom}</p>`
      );}
  
   // formats  status
   reservationStatusFormatter(reservation:Reservation): any {
    if (reservation.active) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span class="btn btn-soft-success rounded-pill waves-effect waves-light">Active</span>`
      );
    }
    else {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span class="btn btn-soft-danger rounded-pill waves-effect waves-light">Disable</span>`
      );
    }

  }
  onPrintClicked(res: any): void {
   console.log("hhhhhhhh");
  }
  onStatusChangeClicked(res: any): void {
    
    res.active = !res.active;
    this.reservationservice.updateReservation(res).subscribe({
      next: () => {
        this._fetchData();
      },
      error: (err: any) => console.log(err)
    });
  }
  onViewClicked(res: any): void {
    this.router.navigate(['/admin/pages/invoice', res.id]);
  }
  onEditClicked(res: any): void {
    this.router.navigate(['/admin/reservations/updatereservation', res.id]);
  }
exportPdf(){
this.reservationservice.exportPdf().subscribe(data => {
  
  const blob = new Blob([data], { type: 'application/pdf' });
  
  // if(window.navigator && window.navigator.msSaveOrOpenBlob){
  //   window.navigator.msSaveOrOpenBlob(blob);
  //   return;
  // }
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Reservation.pdf';
  link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
  setTimeout(function()  {
    window.URL.revokeObjectURL(url);
    link.remove();
  },100);
})
}

 

/**
 * Compare two cell values
 * @param v1 Value 1
 * @param v2 Value 2
 * @returns Comparison result
 */
compare(v1: string | number, v2: string | number): any {
  if (typeof v1 === 'string' && typeof v2 === 'string') {
    return v1.localeCompare(v2);
  } else {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
}
/**
 * Get the property value of an object dynamically using a string key
 * @param obj The object
 * @param key The property key
 * @returns The property value
 */
getPropertyValue(obj: any, key: string): any {
  return obj[key];
}

  /**
   * Sort the table data
   * @param event column name, sort direction
   */
  onSort(event: SortEvent): void {
    if (event.direction === '') {
      this.records = [...this.records];
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(this.getPropertyValue(a, event.column), this.getPropertyValue(b, event.column));
        return event.direction === 'asc' ? res : -res;
      });
    }
  }

  /**
 * Match table data with search input
 * @param row Table row
 * @param term Search the value
 */
  matches(row: Reservation, term: string) {
    return String(row.numberReserved).toLowerCase().includes(term)
      || String(row.totalAmount).includes(term)
      || String(row.dateStart).includes(term)
      || String(row.dateEnd).includes(term);
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = [...this.records];

      //  filter
      updatedData = updatedData.filter(record => this.matches(record, searchTerm));
      this.records = updatedData;
    }
  }

 
}
