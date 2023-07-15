import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandsRoutingModule } from './commands-routing.module';
import { CommandsComponent } from './commands.component';


@NgModule({
  declarations: [
    CommandsComponent
  ],
  imports: [
    CommonModule,
    CommandsRoutingModule
  ]
})
export class CommandsModule { }
