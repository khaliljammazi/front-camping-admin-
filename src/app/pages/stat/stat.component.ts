import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ChartOptions } from '../charts/apex/apex-chart.model';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { map } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/Activity';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  salesChart!: Partial<ChartOptions>;
  lineChartOptions1: Partial<ChartOptions> = {};
  listAvtivity : any ;
  revenuChart!: Partial<ChartOptions>;


  pageTitle: BreadcrumbItem[] = [];
  list : any;
  occupied :any;
  unocpiied : any;
  constructor(
    private campservice : CampCenterService,
    private activityService:ActivitiesService
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: '', path: '/' }, { label: 'Dashboard ', path: '/', active: true }];
this.campservice.getOccupancyRate().subscribe((data)=>{
  this.occupied = data[0].toFixed(2); 
  this.unocpiied = data[1].toFixed(2);
  this.list = data;
this.salesChart = {
  series: this.list,
  chart: {
    type: 'donut',
    height: 273,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            formatter: function (val: any) {
              return val;
            },
          },
          value: {
            show: true,
            formatter: function (val: any) {
              return val;
            },
          },
        },
      },
    },
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 0.7
      }
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#6658dd', '#4fc6e1', '#ebeff2'],
  legend: {
    show: false,
  },
  labels: ['Occupied', 'Unoccupied'],
  tooltip: {
    enabled: false,
  },
};
});
this.campservice.getcalculateADR().subscribe((data)=>{

  const list=data.map((item:any)=>{
    return parseFloat(item.toFixed(2))*20;
  })
  console.log(list);


this.lineChartOptions1 = {
  series: [
    {
      name: "Average Rate per Month",
      data: list
    }
  ],
  chart: {
    height: 350,

    type: "line",
    zoom: {
      enabled: true
    },
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: "smooth",
    width: 4
  },
  title: {
    text: "Product Trends by Month",
    align: "left"
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], 
      opacity: 1
    }
  },
  colors: ['#727cf5'],
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]
  }
};
}
);
this.campservice.getcalculateRevenuePerOccupiedSpace().subscribe((data)=>{
  console.log(data);
  const list=[];
  list.push(data);

this.revenuChart = {
  series: list,
  chart: {
    height: 242,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '65%',
      }
    },
  },
  colors: ['#f86262'],
  labels: ['Revenue'],

};
});

this.activityService.TopActivities().subscribe((data:any) => {
  // Assuming data is an array of arrays, as shown in your output.
  this.listAvtivity = data.map((d: any[]) => {
    const [name, imageUrl, id] = d;
    return { name, imageUrl, id }; // Returning an object directly
  });
  console.log(this.listAvtivity); // Array of Activity objects
});
  

}
  /**
   * initialize charts
   */
  initChart(): void {
   

  
  }


}
