// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment.prod';

// @Injectable({
//   providedIn: 'root',
// })
// export class TaskService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}
//   getTasks(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   // Create a new task
//   createTask(task: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, task);
//   }

//   // Update a task
//   updateTask(taskId: string, task: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${taskId}`, task);
//   }

//   // Delete a task
//   deleteTask(taskId: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  
  updateTask(taskId: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, task);
  }


  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }
}
