import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
camp:CampingCenter=new CampingCenter();
pageTitle: BreadcrumbItem[] = [];

  constructor(
 private campCenter : CampCenterService,
  private route : ActivatedRoute,
  private sanitizer: DomSanitizer,


  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'camping-center', path: '/', active: true }];
    
this.route.params.subscribe(params => {
  this.campCenter.getCampingById(params['id']).subscribe(
    {
    next: (data: any) => {
      this.camp=data;
    }
  }
  );
});

  }

  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.camp.description);
  }


}
