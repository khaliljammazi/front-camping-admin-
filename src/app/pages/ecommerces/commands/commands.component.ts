import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Command, ProductCommand } from 'src/app/models/command';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  pageSizeOptions: number[] = [10, 25, 50, 100];
  columns: Column[] = [];
  originalCommands: Command[] = [];
  commands: Command[] = [];
 comman: Command[]=[]
 commandId!:any
 page = 1;
  pageSize = 8;
  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 8;
  totalItems = 0;
  paginatedCommands: Command[] = [];
  @ViewChild('advancedTable') advancedTable: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private commandService:CommandService
  ) { }

  ngOnInit(): void {
    this._fetchData();
    this.initAdvancedTableData();
  }
  getProductNames(command: Command): string {
    return command.productCommands.map(pc => pc.product.name).join(', ');
  }
  getPrice(command: Command): string {
    return command.productCommands.map(pc => pc.priceTotal).join(', ');
  }
  getImage(command: Command): string[] {
    return command.productCommands.map(pc => pc.product.image);
  }
  initAdvancedTableData(): void {
    this.columns = [
    
      {
        name: 'name',
        label: 'Product',
        formatter: this.CommandimageFormatter.bind(this)
      },
      {
        name: 'Product',
        label: ' Name',
        formatter: (command: Command) => this.getProductNames(command)
      },
      {
        name: 'id',
        label: 'Id',
        formatter: (command:Command) => command.id
      },
     
      {
        name: 'customerFirstName',
        label: 'Customer FirstName',
        formatter: (command:Command) =>command.customerFirstName
      },
      {
        name: 'customerLastName',
        label: ' Customer LastName',
        formatter: (command:Command) =>command.customerLastName
      },
      {
        name: 'customerEmail',
        label: 'Customer Email',
        formatter: (command:Command) => command.customerEmail
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        formatter: (command:Command) => command.phoneNumber
      },
      {
        name: 'shippingAddress',
        label: 'Shipping Address',
        formatter: (command:Command) => command.shippingAddress
      },
      {
        name: 'method',
        label: 'Shipping Method ',
        formatter: (command:Command) => command.method
      },
      {
        name: 'priceTotal',
        label: 'Total Price ',
        formatter: (command: Command) => this.getPrice(command)
      },
      {
        name: 'confirmed',
        label: ' Status ',
        formatter: (command:Command) => command.confirmed
      },
      {
        name: 'created_on',
        label: 'Created Date',
        formatter: (command:Command) => this.formatDate(command.createdAt)
      },
      {
        name: 'edit_on',
        label: 'updated Date',
        formatter: (command:Command) =>  this.formatDate(command.modifiedAt)

      },
      
    ];
  }
  CommandimageFormatter(command: Command): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <img src="${command.productCommands.map(pc => pc.product.image)}" alt="table-user" class="me-2 rounded-circle">

       </div>
      `
    );
  }
  onStatusChangeClicked(id:any|number, comm: any|boolean ): void {
    if (id !== undefined && comm !== undefined) 
    comm.confirmed = !comm.confirmed ;
    this.commandService.updateCommand(id,comm).subscribe({
      next: () => {
        this._fetchData();
      },
      error: (err: any) => console.log(err)
    });
  }
  findCommandById(id: number): Command | undefined {

    return this.originalCommands.find((command: Command) => command.id === id);
  }
  formatDate(date:Date|undefined): any {
    return moment(date).format('DD/MM/YYYY');
  }
  _fetchData(): void {
    this.commandService.getAllCommands().subscribe(
     (response: any) => {
       this.commands = response;
       this.commandId=response.id
       this.originalCommands = [...this.commands];
       this.totalItems = this.commands.length;
        this.updatePagination();
     },
     (error: any) => {
       console.error('Error fetching products', error);
     }
   );
 }
 searchData(searchTerm: string): void {
  if (searchTerm === '') {
    this._fetchData();
  }
  else {
    let updatedData = [...this.commands];
    //  filter
    updatedData = updatedData.filter(command => command.customerFirstName?.toLowerCase().includes(searchTerm));
    this.commands = updatedData;
  }

}
onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePagination();
}

updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.paginatedCommands = this.commands.slice(startIndex, startIndex + this.itemsPerPage);
}

editCommand(CommandId: number|any) {
  this.router.navigate(['/admin/ecommerces/commands/add-command', CommandId],{ relativeTo: this.route });
}
}
