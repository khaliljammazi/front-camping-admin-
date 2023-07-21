import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/Activity';
import { User } from 'src/app/models/user';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';


@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent implements OnInit {
  records: Activity[] = [];
  pageTitle: BreadcrumbItem[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];


  constructor(  private activityService: ActivitiesService,
    private sanitizer: DomSanitizer,
    private router: Router,private authService: AuthService) {}

    ngOnInit(): void {
      this.pageTitle = [{ label: 'activities', path: '/', active: true }];
      this._fetchData();
      this.initTableCofig();
    }

    _fetchData(): void {
      const currentUser = this.authService.currentUser();
      if (currentUser.id != undefined){
      this.activityService.actUser(currentUser.id).subscribe(
        {
          next: (act: Activity[]) => {
            this.records = act;
          
          },
          error: (err: any) => console.log(err)
  
        });
      }else{
        console.log('UserId undefined'); // Handle the case when user ID is undefined
      }
    }

    initTableCofig(): void {
      this.columns = [
        {
          name: 'Favorite',
          label: 'Favorite',
          formatter: this.ActivityFavoriteFormatter.bind(this),
          width: 180,
        },
        {
          name: 'image',
          label: 'image',
          formatter: this.ActivityImageFormatter.bind(this),
          width: 80,
        },
        {
          name: 'Label',
          label: 'Label',
          formatter: (record: Activity) => record.label,
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
          name: 'actions',
          label: 'actions',
          formatter: ()=>{},
          width: 5
        }
      ];
    }

    onViewClicked(act: any): void {
      this.router.navigate(['/activities/detail', act.id]);
    }

     // formats  status
     ActivityFavoriteFormatter(act: Activity): any {
      const iconClass = act.favorite ? 'fas fa-heart' : 'far fa-heart';
      const iconStyle = act.favorite ? 'color: red;' : 'color: red; background-color: white; padding: 2px; border-radius: 50%;';
    
      return this.sanitizer.bypassSecurityTrustHtml(
        `<i class="${iconClass}" style="${iconStyle}"></i>`
      );
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

      onIconClick(activityId: any): void {
      const currentUser = this.authService.currentUser();
      if (currentUser.id !== undefined) {
        const index = this.records.findIndex((activity) => activity.id === activityId);
        if (index !== -1) {
          const activity = this.records[index];
          if (activity.favorite) {
            this.activityService.deleteFromFavorites(activityId, currentUser.id).subscribe(
              () => {
                console.log('Activity removed from favorites');
                this.records[index].favorite = false; // Update the favorite property
                this._fetchData();
              },
              (error) => {
                console.error('Failed to remove activity from favorites:', error);
              }
            );
          } else {
            this.activityService.addToFavorites(activityId, currentUser.id).subscribe(
              () => {
                console.log('Activity added to favorites');
                this.records[index].favorite = true; // Update the favorite property
                this._fetchData();

              },
              (error) => {
                console.error('Failed to add activity to favorites:', error);
              }
            );
          }
        }
      } else {
        console.log('UserId undefined');
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

  compare(v1: string | number, v2: string | number): any {
    if (typeof v1 === 'string' && typeof v2 === 'string') {
      return v1.localeCompare(v2);
    } else {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }
    }

    getPropertyValue(obj: any, key: string): any {
      return obj[key];
      }
      



}
