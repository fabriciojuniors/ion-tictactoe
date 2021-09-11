import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoundSoloPageRoutingModule } from './round-solo-routing.module';

import { RoundSoloPage } from './round-solo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundSoloPageRoutingModule
  ],
  declarations: [RoundSoloPage]
})
export class RoundSoloPageModule {}
