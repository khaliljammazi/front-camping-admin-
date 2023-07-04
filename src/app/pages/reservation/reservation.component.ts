import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';
import { DomSanitizer } from '@angular/platform-browser';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

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
        next: (camps: Reservation[]) => {
          this.records = camps;
        
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
        formatter: (record: Reservation) => record.activities,
        width: 40
      },
      {
        name: 'campingCenter',
        label: 'campingCenter',
        formatter: (record: Reservation) => record.campingCenter,
        width: 40
      },

      {
        name: 'actions',
        label: 'actions',
        formatter: this.customerActionFormatter.bind(this),
        width: 100,
      },

    ];
  }


  customerActionFormatter(record: Reservation): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<div class="button-list">
      <a  href="/reservation/updatereservation/${record.id}" class="btn btn-blue waves-effect waves-light"><i
              class="mdi mdi-book-edit"></i></a>
  </div>`
    );
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
