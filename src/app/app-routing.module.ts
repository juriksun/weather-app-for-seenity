import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MoreDataComponent } from './components/more-data/more-data.component';
import { ShortDataComponent } from './components/short-data/short-data.component';

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

const routes: Routes = [
  { 
    path: 'short-data',
    component: ShortDataComponent
  },
  { 
    path: 'more-data',
    component: MoreDataComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
