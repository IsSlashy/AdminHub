import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin/admin-routing.module';

const routes: Routes = [];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
