import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecaoSalaPageRoutingModule } from './selecao-sala-routing.module';

import { SelecaoSalaPage } from './selecao-sala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecaoSalaPageRoutingModule
  ],
  declarations: [SelecaoSalaPage]
})
export class SelecaoSalaPageModule {}
