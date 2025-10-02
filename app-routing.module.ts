import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'anuncios',
    loadChildren: () => import('./anuncios/anuncios.module').then( m => m.AnunciosPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'contatos',
    loadChildren: () => import('./contatos/contatos.module').then( m => m.ContatosPageModule)
  },
  {
    path: 'suporte',
    loadChildren: () => import('./suporte/suporte.module').then( m => m.SuportePageModule)
  },
  {
    path: 'resetsenha',
    loadChildren: () => import('./resetsenha/resetsenha.module').then( m => m.ResetsenhaPageModule)
  },
  {
    path: 'pastas-catalogo',
    loadChildren: () => import('./pastas-catalogo/pastas-catalogo.module').then( m => m.PastasCatalogoPageModule)
  },
  {
    path: 'eko7textil',
    loadChildren: () => import('./pastas-catalogo/eko7textil/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'eko7colchoes',
    loadChildren: () => import('./pastas-catalogo/eko7colchoes/eko7colchoes.module').then( m => m.Eko7colchoesPageModule)
  },
  {
    path: 'madressenza',
    loadChildren: () => import('./pastas-catalogo/madressenza/madressenza.module').then( m => m.MadressenzaPageModule)
  },
  {
    path: 'rastreio',
    loadChildren: () => import('./rastreio/rastreio.module').then( m => m.RastreioPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
