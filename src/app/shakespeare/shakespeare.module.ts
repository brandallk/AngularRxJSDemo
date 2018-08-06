import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShakespeareRoutingModule } from './shakespeare-routing.module';
import { PlaysComponent } from './components/plays/plays.component';
import { PlayTableComponent } from './components/play-table/play-table.component';
import { PlayDetailsComponent } from './components/play-details/play-details.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { ShakespeareService } from './services/shakespeare.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShakespeareRoutingModule
  ],
  declarations: [
    PlaysComponent,
    PlayTableComponent,
    PlayDetailsComponent,
    EditModalComponent
  ],
  providers: [
    ShakespeareService
  ]
})
export class ShakespeareModule {}
