import { Component, OnInit, Input  } from '@angular/core';
import { UserStat } from 'src/app/models/user';
import { ChartOptions } from 'src/app/pages/charts/apex/apex-chart.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-statistics-by-month',
  templateUrl: './user-statistics-by-month.component.html',
  styleUrls: ['./user-statistics-by-month.component.scss']
})
export class UserStatisticsByMonthComponent implements OnInit {

  mixedChartOptions: Partial<ChartOptions> = {};
  @Input() userId!: number;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getStatsByMonthAndUserId(this.userId).subscribe(data =>{
      next: this.initMixedChart(data);
    })
  }
 /**
   *  initialize mixed chart config
   */
 initMixedChart(stats: UserStat[]): void {
  this.mixedChartOptions = {
    series: [
      {
        name: "Revenue",
        type: "column",
        
        data: stats.map(s=> Math.round(s.revenue)) as any[]
      },
      {
        name: "Reservations number",
        type: "area",
        data: stats.map(s=> s.countReservation) 
      }
    ],
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      }
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth"
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    colors: ['#727cf5', '#39afd1', '#fa5c7c'],
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: stats.map(s=> String(s.date)),
    markers: {
      size: 0
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      title: {
        text: "Points"
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: number) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
    }
  };
}
}
