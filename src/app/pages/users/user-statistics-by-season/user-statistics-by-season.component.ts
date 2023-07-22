import { Component, Input, OnInit } from "@angular/core";
import { UserStat } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { ChartOptions } from "../../charts/apex/apex-chart.model";

@Component({
  selector: "app-user-statistics-by-season",
  templateUrl: "./user-statistics-by-season.component.html",
  styleUrls: ["./user-statistics-by-season.component.scss"],
})
export class UserStatisticsBySeasonComponent implements OnInit {
  revenueBySeasonChart: Partial<ChartOptions> = {};
  reservationNumberBySeasonChart: Partial<ChartOptions> = {};
  @Input() userId!: number;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getStatsBySeasonalActivitiesAndUserId(this.userId).subscribe((data) => {
      next: this.initPieCharts(data);
    });
  }

  /**
   * initialize pie chart config
   */
  initPieCharts(stats: UserStat[]): void {
    this.revenueBySeasonChart = {
      chart: {
        height: 320,
        type: "pie",
        toolbar: {
          show: false,
        },
      },
      series: stats.map(s=> Math.round(s.revenue)),
      labels: stats.map(s=> String(s.season)),
      colors: ["#6658dd", "#4fc6e1", "#4a81d4", "#00b19d", "#f1556c"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        // verticalAlign: 'middle',
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: -10,
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              height: 240,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    };

    this.reservationNumberBySeasonChart = {
      series: stats.map(s=> s.countReservation),
      labels: stats.map(s=> String(s.season)),
      chart: {
        height: 320,
        type: "donut",
        toolbar: {
          show: false,
        },
      },
      colors: ["#4fc6e1", "#4a81d4", "#00b19d", "#f1556c"],
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        // verticalAlign: 'middle',
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: -10,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }
}
