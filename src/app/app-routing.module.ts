import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent} from './components/list/list.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'post/:id', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
