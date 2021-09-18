import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoundMultiplayerPage } from './round-multiplayer.page';

const routes: Routes = [
  {
    path: '',
    component: RoundMultiplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoundMultiplayerPageRoutingModule {}
