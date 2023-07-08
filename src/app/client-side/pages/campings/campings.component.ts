import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ChartjsOptions } from 'src/app/pages/charts/chartjs/chartjs.model';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { MapConfig } from 'src/app/pages/maps/google-map/google-map.model';

@Component({
  selector: 'app-campings',
  templateUrl: './campings.component.html',
  styleUrls: ['./campings.component.scss']
})
export class CampingsComponent implements OnInit {
camping:CampingCenter=new CampingCenter();
desc: string = '';
gmapConfig2!: MapConfig;


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private campingsService:CampCenterService,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.campingsService.getCampingById(params['id']).subscribe(camping=>{
        if(camping){
          this.camping=camping;
          this.desc = this.camping.description;
          this.gmapConfig2 = {
            lat:  33.8869,
            lng: 9.5375,
            markers: [
              {
                lat: 33.8869,
                lng: 9.5375,
                title: this.camping.label,
              }
            
            ]
          }
          
        }else{
          this.router.navigate(['/client-side'])
        }

      })
    })

   

   
    

    


  }
  getSanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.desc);
  }

   

   
  

  

  
  /**
   * executes after map is loaded
   * @param map Gmap
   */
  mapReady(map: any): void {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });
  }
}
