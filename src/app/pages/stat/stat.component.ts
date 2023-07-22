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
  import { FeedBack } from 'src/app/models/FeedBack';
  import { CampingCenter } from 'src/app/models/CampingCenter';
  import { Product } from 'src/app/models/product';
  import { ProductService } from 'src/app/services/product.service';
  import { FeedbackService } from 'src/app/services/feedback.service';
  import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
  import { SentimentAnalysisService } from 'src/app/services/sentiment-analysis.service';


  @Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
  })
  export class StatComponent implements OnInit {
    getKeys(obj: any): string[] {
      return Object.keys(obj);
    }
    salesChart!: Partial<ChartOptions>;
    lineChartOptions1: Partial<ChartOptions> = {};
    revenueChartOptions!: ChartjsOptions;
    performanceChartOptions!: ChartjsOptions;
    listAvtivity : any ;
    pageTitle: BreadcrumbItem[] = [];
    campcenters: CampingCenter[] = [];
    activities: Activity[] = [];
    products: Product[] = [];
    ActivityFeedbacks: { [key: number]: FeedBack[] } = {};
    CampingFeedbacks: { [key: number]: FeedBack[] } = {};
    ProductFeedbacks: { [key: number]: FeedBack[] } = {};
    isCardCollapsed: { [key: number]: boolean } = {};
    isClosed: boolean = false;
    isRefreshing: { [key: number]: boolean } = {};
    campingRatings: { [key: number]: number | null } = {};
    activityRatings: { [key: number]: number | null } = {};
    productRatings: { [key: number]: number | null } = {};
    campingSentiments: { [key: number]: number[] } = {};
    activitySentiments: { [key: number]: number[] } = {};
    productSentiments: { [key: number]: number[] } = {};

  

    revenuChart!: Partial<ChartOptions>;

  statisticsData: StatisticsCard2[] = [];
    statistics: any;

    list : any;
    occupied :any;
    unocpiied : any;
    constructor(
      private campservice : CampCenterService,
      private activityService:ActivitiesService,
      private productService: ProductService,
      private ReservationService: ReservationService,
      private feedbackService: FeedbackService,
      private sanitizer: DomSanitizer,
      private sentimentService: SentimentAnalysisService
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
  
      
  this.fetchCampingCenters();
  console.log("feedback camping", this.CampingFeedbacks);
  this.fetchActivities();
  console.log("feedback activity", this.ActivityFeedbacks);
  this.fetchProducts();
  console.log("feedback product", this.ProductFeedbacks);




    }
    getProgressBarClass(percentage: number): string {
      if (percentage < 30) {
        return 'progress-bar progress-bar-danger progress-bar-striped';
      } else if (percentage >= 30 && percentage <= 60) {
        return 'progress-bar progress-bar-warning progress-bar-striped';
      } else {
        return 'progress-bar progress-bar-success progress-bar-striped';
      }
    }
    fetchCampingCenters(): void {
      this.campservice.getCamps().subscribe(
        (campcenters) => {
          this.campcenters = campcenters;
          this.fetchCampingFeedbacks();
        },
        (error) => {
          console.log('Error fetching camping centers:', error);
        }
      );
    }

    fetchCampingFeedbacks(): void {
      const campingCenterIds = this.campcenters.map((campcenter) => campcenter.id);
      campingCenterIds.forEach((campingCenterId) => {
        this.feedbackService.getRatingByCampingCenterId(campingCenterId).subscribe(
          (rating) => {
            this.campingRatings[campingCenterId] = rating;

            this.feedbackService.getCampingCenterFeedbacks(campingCenterId).subscribe(
              (feedbacks: FeedBack[]) => {
                this.CampingFeedbacks[campingCenterId] = feedbacks;

                this.analyzeFeedbacks(feedbacks, 'camping');
              },
              (error) => {
                console.log('Error fetching camping center feedbacks:', error);
              }
            );
          },
          (error) => {
            console.log('Error fetching feedbacks:', error);
          }
        );
      });
    }

    fetchActivities(): void {
      this.activityService.getActivity().subscribe(
        (activities) => {
          this.activities = activities;
          this.fetchActivityFeedbacks();
        },
        (error) => {
          console.log('Error fetching activities:', error);
        }
      );
    }


    fetchActivityFeedbacks(): void {
      const activityIds = this.activities.map((activity) => activity.id);
      activityIds.forEach((activityId) => {
        this.feedbackService.getRatingByActivityId(activityId).subscribe(
          (rating) => {
            this.activityRatings[activityId] = rating;

            this.feedbackService.getActivityFeedbacks(activityId).subscribe(
              (feedbacks: FeedBack[]) => {
                this.ActivityFeedbacks[activityId] = feedbacks;

                this.analyzeFeedbacks(feedbacks, 'activity');
              },
              (error) => {
                console.log('Error fetching activity feedbacks:', error);
              }
            );
          },
          (error) => {
            console.log('Error fetching feedbacks:', error);
          }
        );
      });
    }
    fetchProducts(): void {
      this.productService.getAllProducts().subscribe(
        (products) => {
          this.products = products;
          this.fetchProductFeedbacks();
        },
        (error) => {
          console.log('Error fetching products:', error);
        }
      );
    }
    fetchProductFeedbacks(): void {
      const productIds = this.products.map((product) => product.id);
      productIds.forEach((productId) => {
        this.feedbackService.getRatingByProductId(productId).subscribe(
          (rating) => {
            this.productRatings[productId] = rating;

            this.feedbackService.getProductFeedbacks(productId).subscribe(
              (feedbacks: FeedBack[]) => {
                this.ProductFeedbacks[productId] = feedbacks;

                this.analyzeFeedbacks(feedbacks, 'product');
              },
              (error) => {
                console.log('Error fetching product feedbacks:', error);
              }
            );
          },
          (error) => {
            console.log('Error fetching feedbacks:', error);
          }
        );
      });
    }
    calculateGeneralRating(rating: number | null, sentiments: number[] | null): number {
      if (rating === null || sentiments === null || sentiments.length === 0) {
        return 0;
      }
    
      const averageRating = (rating + this.calculateAverageSentiment(sentiments)) / 2;
      const maxRating = 5; 
    
      return (averageRating / maxRating) * 100;
    }
    calculateAverageSentimentPercentage(sentiments: number[]): number {
      const averageSentiment = this.calculateAverageSentiment(sentiments);
      const maxSentiment = 5;
      return (averageSentiment / maxSentiment) * 100;
    }
    calculateAverageSentiment(sentiments: number[]): number {
      if (sentiments.length === 0) return 0;
      const totalSentiments = sentiments.length;
      const sumSentiments = sentiments.reduce((acc, sentiment) => acc + sentiment, 0);
      const averageSentiment = sumSentiments / totalSentiments;
      return averageSentiment;
    }
    analyzeFeedbacks(feedbacks: FeedBack[], type: string): void {
      feedbacks.forEach((feedback) => {
        const sentimentScore = this.sentimentService.analyzeSentiment(feedback.description);
        sentimentScore.subscribe(
          (result: any) => {
            if (type === 'camping') {
              const campingCenterId = feedback.campingCenter.id;
              if (!this.campingSentiments[campingCenterId]) this.campingSentiments[campingCenterId] = [];
              this.campingSentiments[campingCenterId].push(result.score);
            } else if (type === 'activity') {
              const activityId = feedback.activity.id;
              if (!this.activitySentiments[activityId]) this.activitySentiments[activityId] = [];
              this.activitySentiments[activityId].push(result.score);
            } else if (type === 'product') {
              const productId = feedback.product.id;
              if (!this.productSentiments[productId]) this.productSentiments[productId] = [];
              this.productSentiments[productId].push(result.score);
            }
            console.log('Sentiment analysis result:', feedback.description, result);
          },
          (error) => {
            console.log('Error analyzing feedback:', error);
          }
        );
      });
    }
    

    
    getRatingStars(rating: number | null): SafeHtml {
      if (rating === null) {
        return '';
      }
    
      const fullStars = '<i class="mdi mdi-star"></i>'.repeat(Math.floor(rating));
      const hasHalfStar = rating % 1 !== 0;
      const halfStar = hasHalfStar ? '<i class="mdi mdi-star-half"></i>' : '';
      const emptyStars = '<i class="mdi mdi-star-outline"></i>'.repeat(5 - Math.ceil(rating));
    
      const ratingStarsHtml = fullStars + halfStar + emptyStars;
      return this.sanitizer.bypassSecurityTrustHtml(ratingStarsHtml);
    }
  }


