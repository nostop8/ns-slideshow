import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenFormComponent } from './pages/screen-form/screen-form.component';
import { ScreenComponent } from './pages/screen/screen.component';

const routes: Routes = [
  {
    path: '', component: ScreenFormComponent,
  },
  {
    path: 'screen/:screen_key', component: ScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
