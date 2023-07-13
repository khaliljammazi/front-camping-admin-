import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-camping-center',
  templateUrl: './camping-center.component.html',
  styleUrls: ['./camping-center.component.scss']
})
export class CampingCenterComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: CampingCenter[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];


  constructor(
  private CampCenterService: CampCenterService,
  private sanitizer: DomSanitizer,
  private router: Router
  )
   { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'camping-center', path: '/', active: true }];
    this._fetchData();
    this.initTableCofig();
  }
   /**
   * fetches table records
   */
   _fetchData(): void {
    this.CampCenterService.getCamps().subscribe(
      {
        next: (camps: CampingCenter[]) => {
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
        name: 'Label',
        label: 'Label',
        formatter: (record: CampingCenter) => record.label,
        width: 80,
      },
      {
        name: 'image',
        label: 'image',
        formatter: this.CompImageFormatter.bind(this),
        width: 80,
      },

      {
        name: 'description',
        label: 'description',
        formatter: (record: CampingCenter) => record.description,
        width: 360,
      },
      {
        name: 'price',
        label: 'price',
        formatter: (record: CampingCenter) => record.price,
        width: 180
      },
      {
        name: 'capacity',
        label: 'capacity',
        formatter: (record: CampingCenter) => record.capacity,
        width: 40
      },
      {
        name: 'status',
        label: 'status',
        formatter: this.CompStatusFormatter.bind(this),
        width: 180,
      },
      {
        name: 'actions',
        label: 'actions',
        formatter: ()=>{},
        width: 5
      },

    ];
  }

  onStatusChangeClicked(camp: any): void {
    
    camp.active = !camp.active;
    this.CampCenterService.updateCamp(camp).subscribe({
      next: () => {
        this._fetchData();
      },
      error: (err: any) => console.log(err)
    });
  }
 
  onViewClicked(camp: any): void {
    this.router.navigate(['/admin/camping-center/view', camp.id]);
  }
  onEditClicked(camp: any): void {
    this.router.navigate(['/admin/camping-center/update', camp.id]);
  }

  
  // formats Comp status
 CompStatusFormatter(camp:CampingCenter): any {
    if (camp.active) {
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
  // formats Comp image
  CompImageFormatter(camp:CampingCenter): any {
    if (camp.image == null) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<img src="assets/images/users/user-3.jpg" alt="camping center image" class="img-fluid rounded">`
      );
    } else
    {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<img src="${camp.image}" alt="camping center image" class="img-fluid rounded">`
    );
    }
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
  matches(row: CampingCenter, term: string) {
    return row.label.toLowerCase().includes(term)
      || row.description.toLowerCase().includes(term)
      || String(row.price).includes(term)
      || String(row.capacity).includes(term);
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
