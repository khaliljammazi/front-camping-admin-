import { Component, OnInit } from '@angular/core';
import { Command, ProductCommand } from 'src/app/models/command';
import { ChartOptions } from 'src/app/pages/charts/apex/apex-chart.model';
import { CommandService } from 'src/app/services/command.service';
import { ProductService } from 'src/app/services/product.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { RECENTPRODUCTS, TRANSACTIONHISTORY } from '../../../apps/ecommerce/shared/data';
import { Product, Transaction } from '../../../apps/ecommerce/shared/ecommerce.model';

@Component({
  selector: 'app-ecommerce-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  salesChart: Partial<ChartOptions> = {};
  transactionHistory: Transaction[] = [];
  recentProducts: Product[] = [];
  worldMapConfig: any = {};
  productCommands:ProductCommand[]=[]
  commands:Command[]=[]
  products:Product[]=[]
  totalPriceSum = 0;
  totalItems=0
  totalProducts=0
  data:any
  constructor (private commandService:CommandService,private productService: ProductService,) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Ecommerce', path: '/' }, { label: 'Dashboard', path: '/', active: true }];
    this._fetchData();
    this._initChart();
    this.initMapConfig();
    this.ProductData()
    this.OrdersData();
  }

  /**
   * initialize chart
   */
  _initChart(): void {
    this.salesChart = {
      series: [
        {
          name: 'Current Week',
          type: 'area',
          data: [10, 20, 15, 25, 20, 30, 20],
        },
        {
          name: 'Previous Week',
          type: 'line',
          data: [0, 15, 10, 30, 15, 35, 25],
        },
      ],
      chart: {
        height: 363,
        type: 'line',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          opacity: 0.2,
          blur: 7,
          left: -7,
          top: 7,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 4,
      },
      fill: {
        type: 'solid',
        opacity: [0.35, 1],
      },
      colors: ['#6658dd', '#1abc9c'],
      legend: {
        show: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + 'k';
          },
          offsetX: -15,
        },
      },
    }
  }

  /**
   * fetches transaction and products data
   */
  _fetchData(): void {
    this.transactionHistory = TRANSACTIONHISTORY;
    this.recentProducts = RECENTPRODUCTS;
  }

  /**
 * initialize map
 */
  initMapConfig(): void {
    this.worldMapConfig = {
      markers: [
        { name: 'New York', coords: [40.71, -74.0] },
        { name: 'San Francisco', coords: [37.77, -122.41] },
        { name: 'Sydney', coords: [-33.86, 151.2] },
        { name: 'Singapore', coords: [1.3, 103.8] },
      ],
      markerStyle: {
        initial: {
          r: 9,
          fill: '#727cf5',
          'fill-opacity': 0.9,
          stroke: '#fff',
          'stroke-width': 7,
          'stroke-opacity': 0.4,
        },
        hover: {
          fill: '#727cf5',
          stroke: '#fff',
          'fill-opacity': 1,
          'stroke-width': 1.5,
        },
      },
      regionStyle: {
        initial: {
          fill: '#e3eaef',
        },
      },
    }
  }
  calculateTotalPrice():any|number {
    let totalPrice = 0;
    this.productCommands.forEach((pc) => {
      totalPrice += pc.priceTotal ?? 0;
      //this.totalPrices=totalPrice
    });
    return totalPrice;
  }
  OrdersData(): void {
    
    this.commandService.getAllCommands().subscribe(
     (response: Command[]) => {
       this.commands = response;
       this.data = this.commands.map(command => command.productCommands);
       //this.totalPrices = this.calculateTotalPrice();
       this.totalItems = this.commands.length;
       this.data.forEach((innerArray: ProductCommand[]) => {
        innerArray.forEach((productCommand: ProductCommand) => {
          const priceTotal = productCommand.priceTotal;
          this.totalPriceSum += priceTotal??0;
          
        });
      });
       console.log("or",this.data);
       
        
     },
     (error: any) => {
       console.error('Error fetching products', error);
     }
   );
 }
 ProductData(): void {
  this.productService.getAllProducts().subscribe(
   (response: any) => {
     this.products = response;
     this.totalProducts=this.products.length
   },
   (error: any) => {
     console.error('Error fetching products', error);
   }
 );
}
}
