// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TaskService } from '../../services/task.service';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-task-form',
//   imports: [FormsModule,CommonModule],
//   standalone: true,
//   templateUrl: './task-form.component.html',
//   styleUrls: ['./task-form.component.scss'],
// })
// export class TaskFormComponent {
//   task = {
//     entity_name: '',
//     task_type: '',
//     time: '',
//     contact_person: '',
//     note: '',
//     status: 'open',
//   };

//   constructor(private taskService: TaskService) {}

//   createTask(): void {
//     if (
//       !this.task.entity_name ||
//       !this.task.task_type ||
//       !this.task.time ||
//       !this.task.contact_person
//     ) {
//       alert('Please fill in all required fields!');
//       return;
//     }

//     this.taskService.createTask(this.task).subscribe(
//       (response) => {
//         alert('Task created successfully!');
//         this.resetForm();
//       },
//       (error) => {
//         console.error('Error creating task:', error);
//          if (error.status === 0) {
//         alert("Could not connect to the backend. Please check if the Flask server is running.");
//       } else {
//         alert("Error occurred: " + error.message);
//       }
//       }
//     );
//   }

//   resetForm(): void {
//     this.task = {
//       entity_name: '',
//       task_type: '',
//       time: '',
//       contact_person: '',
//       note: '',
//       status: 'open',
//     };
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  task = {
    entity_name: '',
    task_type: '',
    time: '',
    contact_person: '',
    note: '',
    status: 'open',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  createTask(): void {
    if (
      !this.task.entity_name ||
      !this.task.task_type ||
      !this.task.time ||
      !this.task.contact_person
    ) {
      alert('Please fill in all required fields!');
      return;
    }

    this.taskService.createTask(this.task).subscribe(
      (response) => {
        alert('Task created successfully!');
        this.router.navigate(['/task-list']); // Redirect to Task List after creation
        this.resetForm();
      },
      (error) => {
        console.error('Error creating task:', error);
        if (error.status === 0) {
          alert(
            'Could not connect to the backend. Please check if the Flask server is running.'
          );
        } else {
          alert('Error occurred: ' + error.message);
        }
      }
    );
  }

  resetForm(): void {
    this.task = {
      entity_name: '',
      task_type: '',
      time: '',
      contact_person: '',
      note: '',
      status: 'open',
    };
  }
}

