import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampingsRoutingModule } from './campings-routing.module';
import { CampingsComponent } from './campings.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.prod';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CampingsComponent
  ],
  imports: [
    CommonModule,
    CampingsRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
  ]
})
export class CampingsModule { }
