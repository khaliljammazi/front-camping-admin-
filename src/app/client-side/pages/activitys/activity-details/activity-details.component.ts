import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fancybox } from '@fancyapps/ui';
import { Console } from 'console';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Activity } from 'src/app/models/Activity';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ActivitiesService } from 'src/app/services/activities.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity = new Activity();
  records: CampingCenter[] = [];

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    autoplayTimeout: 6000,
    navText: ['<span class="far fa-arrow-left"></span>', '<span class="far-angle-right"></span>'],

    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      800: {
        items: 1
      },
      1024: {
        items: 1
      }
    },
  };

  carouselOptions1 = {
    loop: true,
    margin: 30,
    nav: true,
    smartSpeed: 500,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: ['<span class="far fa-angle-left"></span>', '<span class="far fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      600: {
        items: 2
      },
      1800: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  };


  constructor(
    private actService: ActivitiesService,
    private elRef: ElementRef,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.actService.getById(params['id']).subscribe(
        {
          next: (data: any) => {
            this.activity = data;
          }
        }
      );
    });


    this.router.params.subscribe(params => {
      const activityId = Number(params['id']);
      console.log(activityId);

      this.actService.getCamps(activityId).subscribe(
        {
          next: (camp: CampingCenter[]) => {
            this.records = camp;
            console.log(this.records);
          },
          error: (err: any) => console.log(err)
        }
      );
    });
  
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

}