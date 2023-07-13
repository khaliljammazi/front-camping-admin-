import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/Activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  act:Activity=new Activity();
  pageTitle: BreadcrumbItem[] = [];
  constructor(private activityService : ActivitiesService,
    private route : ActivatedRoute,
    private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
      this.pageTitle = [{ label: 'Activity', path: '/', active: true }];
      
  this.route.params.subscribe(params => {
    this.activityService.getById(params['id']).subscribe(
      {
      next: (data: any) => {
        this.act=data;
      }
    }
    );
  });
  
    }
  
    getSanitizedContent(): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(this.act.description);
    }
  
  
  }
