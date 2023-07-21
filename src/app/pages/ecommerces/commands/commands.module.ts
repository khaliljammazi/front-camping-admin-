import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommandsRoutingModule } from './commands-routing.module';
import { CommandsComponent } from './commands.component';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CommandsComponent
  ],
  imports: [
    CommonModule,
    CommandsRoutingModule,
    NgbPaginationModule,
    FormsModule,
    AdvancedTableModule 
  ]
})
export class CommandsModule { }
