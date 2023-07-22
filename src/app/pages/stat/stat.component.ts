import { ReservationService } from 'src/app/services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ChartOptions } from '../charts/apex/apex-chart.model';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { map } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/Activity';
import { StatisticsCard2 } from 'src/app/shared/widget/statistics-card2/statistics-card2.model';
import { ChartjsOptions } from '../charts/chartjs/chartjs.model';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  salesChart!: Partial<ChartOptions>;
  lineChartOptions1: Partial<ChartOptions> = {};
  revenueChartOptions!: ChartjsOptions;
  performanceChartOptions!: ChartjsOptions;

  listAvtivity : any ;

 

  revenuChart!: Partial<ChartOptions>;

 statisticsData: StatisticsCard2[] = [];
  statistics: any;

  pageTitle: BreadcrumbItem[] = [];
  list : any;
  occupied :any;
  unocpiied : any;
  constructor(
    private campservice : CampCenterService,
    private activityService:ActivitiesService,
    private ReservationService: ReservationService,
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
  this.listAvtivity = data.map((d: any[]) => {
    const [name, imageUrl, id] = d;
    return { name, imageUrl, id };
  });
  console.log(this.listAvtivity); 
});
const initialMonthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

this.ReservationService.getReservationStatisticsByMonth().subscribe((data)=>{
  this.statistics = data;
  this.statistics.forEach((entry:any) => {
    const monthNumber = entry[0];
    const value = entry[1];

    initialMonthArray[monthNumber - 1] = value;
  });

  console.log(initialMonthArray);

this.revenueChartOptions = {
  type: 'line',
  chartOptions: {
    maintainAspectRatio: false,
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      },
      legend: {
        display: false
      },
      tooltip: {
        intersect: false
      }
    },
    scales: {
      xAxes: {
        grid: {
          color: "rgba(0,0,0,0.05)"
        }
      },
      yAxes: {
        ticks: {
          stepSize: 20
        },
        display: true,
        grid: {
          color: "rgba(0,0,0,0)",
        }
      }
    }
  },
  chartLabels: ["jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"],
  datasets: [{
    label: "Current Week",
    backgroundColor: 'rgba(26, 188, 156, 0.3)',
    borderColor: '#1fa083',
    data: initialMonthArray,
    tension: 0.4,
    fill: {
      target: 'origin',
      above: 'rgba(26, 188, 156, 0.3)',
    },
    pointBackgroundColor: 'transparent',
    pointHoverBackgroundColor: 'transparent',
    pointBorderColor: '#1fa083',
    pointHoverBorderColor: '#1fa083',
    pointBorderWidth: 1.5,
    capBezierPoints: true,
  }]
};
});
    



  }






}
