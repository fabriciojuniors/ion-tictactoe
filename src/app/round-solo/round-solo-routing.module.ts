import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoundSoloPage } from './round-solo.page';

const routes: Routes = [
  {
    path: '',
    component: RoundSoloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoundSoloPageRoutingModule {}
