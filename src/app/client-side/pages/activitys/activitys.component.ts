import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/Activity';
import { User } from 'src/app/models/user';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

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
    private router: Router,private authService: AuthService) { }

    ngOnInit(): void {
      this.pageTitle = [{ label: 'activities', path: '/', active: true }];
      this._fetchData();
      this.initTableCofig();
    }

    _fetchData(): void {
      const currentUser = this.authService.currentUser();
      if (currentUser.id !== undefined) {
      this.activityService.actUser(currentUser.id).subscribe(
        {
          next: (act: Activity[]) => {
            this.records = act;
            
          
          },
          error: (err: any) => console.log(err)
  
        });
      }
      else {
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
      this.router.navigate(['/admin/activities/view', act.id]);
    }


     // formats  status
// formats  status
ActivityFavoriteFormatter(act: Activity): any {
  if (act.favorite) {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<i class="fas fa-heart" style="color: red;"></i>`
    );
  } else {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<i class="far fa-heart" style="color: red; background-color: white; padding: 2px; border-radius: 50%;"></i>`
      );
  }
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

    onIconClick(activityId: any) {
      const currentUser = this.authService.currentUser();
      if (currentUser.id !== undefined) {
      this.activityService.addToFavorites(activityId, currentUser.id).subscribe(
        () => {
          console.log("Activity added to favorites successfully.");
        },
        (error) => {
          console.error("Failed to add activity to favorites:", error);
        }
      );
      }
      else {
        console.log('UserId undefined'); // Handle the case when user ID is undefined
      }
    }
}
