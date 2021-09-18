import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoundMultiplayerPageRoutingModule } from './round-multiplayer-routing.module';

import { RoundMultiplayerPage } from './round-multiplayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundMultiplayerPageRoutingModule
  ],
  declarations: [RoundMultiplayerPage]
})
export class RoundMultiplayerPageModule {}
