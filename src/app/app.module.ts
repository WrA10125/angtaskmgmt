import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-form', component: TaskFormComponent },
  { path: 'task-form/:id', component: TaskFormComponent }, 
  { path: '', redirectTo: '/task-list', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TaskFormComponent,
    TaskListComponent,
    AppComponent,
    RouterModule.forRoot(routes), // Register the routes here
  ],
  providers: [TaskService, provideHttpClient()],
 
})
export class AppModule {}
