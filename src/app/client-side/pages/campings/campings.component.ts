import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ChartjsOptions } from 'src/app/pages/charts/chartjs/chartjs.model';
import { CampCenterService } from 'src/app/services/camp-center.service';

@Component({
  selector: 'app-campings',
  templateUrl: './campings.component.html',
  styleUrls: ['./campings.component.scss']
})
export class CampingsComponent implements OnInit {
camping:CampingCenter=new CampingCenter();
desc: string = '';
pieChartOptions!: ChartjsOptions;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private campingsService:CampCenterService,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.campingsService.getCampingById(params['id']).subscribe(camping=>{
        if(camping){
          this.camping=camping;
          this.desc = this.camping.description;
        }else{
          this.router.navigate(['/home']);
        }
      })
    })
  }
  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.desc);
  }
}
