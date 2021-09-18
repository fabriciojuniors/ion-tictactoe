import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'round-solo',
    loadChildren: () => import('./round-solo/round-solo.module').then( m => m.RoundSoloPageModule)
  },
  {
    path: 'selecao-sala',
    loadChildren: () => import('./selecao-sala/selecao-sala.module').then( m => m.SelecaoSalaPageModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./lobby/lobby.module').then( m => m.LobbyPageModule)
  },
  {
    path: 'round-multiplayer',
    loadChildren: () => import('./round-multiplayer/round-multiplayer.module').then( m => m.RoundMultiplayerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
