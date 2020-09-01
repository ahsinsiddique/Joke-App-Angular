import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokeDetailComponent } from './joke-detail/joke-detail.component';
import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';


const routes: Routes = [
  { path: '', component: JokeComponent },
  {
    path: `joke`, component: JokeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
