import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/Activity';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ActivitiesService } from 'src/app/services/activities.service';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: Activity[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(  private activityService: ActivitiesService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'activities', path: '/', active: true }];
    this._fetchData();
    this.initTableCofig();
  }

  _fetchData(): void {
    this.activityService.getActivity().subscribe(
      {
        next: (act: Activity[]) => {
          this.records = act;
          
        
        },
        error: (err: any) => console.log(err)

      });

  }

  initTableCofig(): void {
    this.columns = [
      {
        name: 'Label',
        label: 'Label',
        formatter: (record: Activity) => record.label,
        width: 80,
      },
      {
        name: 'image',
        label: 'image',
        formatter: this.ActivityImageFormatter.bind(this),
        width: 80,
      },
      {
        name: 'description',
        label: 'description',
        formatter: (record: Activity) => record.description,
        width: 360,
      },
      {
        name: 'price',
        label: 'price',
        formatter: (record: Activity) => record.price,
        width: 180
      },
      {
        name: 'capacity',
        label: 'capacity',
        formatter: (record: Activity) => record.capacity,
        width: 40
      },
      {
        name: 'season',
        label: 'season',
        formatter: (record: Activity) => record.season,
        width: 180,
      },
      {
        name: 'status',
        label: 'status',
        formatter: this.ActivityStatusFormatter.bind(this),
        width: 180,
      },
      {
        name: 'actions',
        label: 'actions',
        formatter: ()=>{},
        width: 5
      }
    ];
  }

   // formats  status
   ActivityStatusFormatter(act:Activity): any {
    if (act.active) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span class="btn btn-soft-success rounded-pill waves-effect waves-light">Coming soon</span>`
      );
    }
    else {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span class="btn btn-soft-danger rounded-pill waves-effect waves-light">Disable</span>`
      );
    }

  }

  
  /*onStatusChangeClicked(act: any): void {
    act.active = !act.active;
    this.activityService.updateAct(act).subscribe({
      next: () => {
        this._fetchData();
      },
      error: (err: any) => console.log(err)
    });
  }
  */

  onViewClicked(act: any): void {
    this.router.navigate(['/admin/activities/view', act.id]);
  }

  onEditClicked(act: any): void {
    this.router.navigate(['/admin/activities/update', act.id]);
  }


  // formats  image
  ActivityImageFormatter(act:Activity): any {
    if (act.image == null) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<img src="assets/images/users/user-3.jpg" alt="activity image" class="img-fluid rounded">`
      );
    } else
    {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<img src="${act.image}" alt="activity image" class="img-fluid rounded">`
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
  matches(row: Activity, term: string) {
    return String(row.label).toLowerCase().includes(term)
      || String(row.season).toUpperCase().includes(term)
      || String(row.price).includes(term)
      || String(row.description).includes(term);
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




  // formats Comp image
  imageFormatter(activity:Activity): any {
    if (activity.image == null) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<img src="assets/images/users/user-3.jpg" alt="activity image" class="img-fluid rounded">`
      );
    } else
    {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<img src="${activity.image}" alt="activity image" class="img-fluid rounded">`
    );
    }
  }

  


 
}
