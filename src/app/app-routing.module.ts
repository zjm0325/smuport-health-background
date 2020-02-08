import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
  { path: 'shell', loadChildren: () => import('./pages/shell/shell.module').then(m => m.ShellModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
