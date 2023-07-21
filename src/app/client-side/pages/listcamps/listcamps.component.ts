import { Component, OnInit } from '@angular/core';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-listcamps',
  templateUrl: './listcamps.component.html',
  styleUrls: ['./listcamps.component.scss']
})
export class ListcampsComponent implements OnInit {
  searchTerm = '';
  selectedOption: number = 0;
  camps: any[] = [];

  page = 1;
  pageSize = 8;
  range = 0;
  show = false;
  loader: boolean = false;
  
  constructor(
private CampCenterService: CampCenterService,
private FeedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.CampCenterService.getCamps().subscribe((c) => {
      this.camps = c.filter((camp)=>camp.active);
      
      
    });
    

  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    this.CampCenterService.getCamps().subscribe((c) => {
      this.camps = c.filter((camp)=>camp.active);
      this.camps = this.camps.filter((camp) => camp.label.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    );
   
    }
    sortData(event: any) {
      this.CampCenterService.getCamps().subscribe((c) => {
        this.camps = c.filter((camp)=>camp.active);
        if (event == 1)  {
          this.camps = this.camps.sort((a, b) => (a.label > b.label) ? 1 : -1);
        }
        if (event == 2)  {
          this.camps = this.camps.sort((a, b) => (a.price > b.price) ? 1 : -1);
        } 
        if (event == 3)  {
          this.camps = this.camps.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
      
      }
      );
     
    }
     calculateDistance(lat1:number, lon1:number, lat2:number, lon2:number) {
      const earthRadius = 6371; // Radius of the Earth in kilometers
      const dLat = this.toRadians(lat2 - lat1);
      const dLon = this.toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
      return distance;
    }
    
     toRadians(degrees:number) {
      return degrees * (Math.PI / 180);
    }
    findCampsbyLocation():void {
  // Request user's location
  if (navigator.geolocation) {
    this.loader = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Filter camping centers within RANGE km 
        this.CampCenterService.getCamps().subscribe((c) => {
          this.camps = c.filter((camp)=>camp.active);
          this.camps = this.camps.filter((camp) => {
            const distance = this.calculateDistance(
              userLat,
              userLng,
              parseFloat(camp.location.split(',')[0]),
              parseFloat(camp.location.split(',')[1])
            );
            return distance <= this.range;
          });
          this.loader = false;
          })
      
      },
      (error) => {
        console.error('Error getting user location:', error);
        this.loader = false;
      }
    );
  } else {
    // Geolocation is not supported by the browser
    alert('Geolocation is not supported by your browser.');
    this.loader = false;
  }



    }
    
    reset():void {
      this.CampCenterService.getCamps().subscribe((c) => {
        this.camps = c.filter((camp)=>camp.active);
        })
        this.range = 0;
    }
    showcard():void {
      this.show = !this.show;
    }
  
  
    


  

}
