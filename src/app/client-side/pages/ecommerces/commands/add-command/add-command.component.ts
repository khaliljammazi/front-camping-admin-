import { Component, OnInit } from '@angular/core';
import { ProductCommand } from 'src/app/models/command';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.scss']
})
export class AddCommandComponent implements OnInit {
  productCommands: ProductCommand[] = [];
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.productCommands = this.shoppingCartService.getDataFromService();
    console.log("data",this.productCommands);
    
  }
}
