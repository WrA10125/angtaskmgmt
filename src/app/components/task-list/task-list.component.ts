// import { Component, OnInit } from '@angular/core';
// import { TaskService } from '../../services/task.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   templateUrl: './task-list.component.html',
//   imports: [CommonModule, FormsModule],
//   styleUrls: ['./task-list.component.scss'],
// })
// export class TaskListComponent implements OnInit {
//   tasks: any[] = [];
//   filteredTasks: any[] = [];
//   filterText: string = '';
//   sortCriteria: string = 'entity_name'; // Default sorting by entity name

//   constructor(private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   // loadTasks(): void {
//   //   this.taskService.getTasks().subscribe(
//   //     (data) => {
//   //       this.tasks = data;
//   //       this.filteredTasks = data; // Initialize filtered tasks with all tasks
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching tasks:', error);
//   //     }
//   //   );
//   // }

//   loadTasks(): void {
//     this.taskService.getTasks({ cache: 'no-cache' }).subscribe(
//       (data) => {
//         this.tasks = data;
//         this.filteredTasks = data;
//       },
//       (error) => {
//         console.error('Error fetching tasks:', error);
//       }
//     );
//   }

//   deleteTask(taskId: string): void {
//     if (confirm('Are you sure you want to delete this task?')) {
//       this.taskService.deleteTask(taskId).subscribe(() => {
//         this.tasks = this.tasks.filter((task) => task._id !== taskId);
//         this.applyFilter();
//       });
//     }
//   }

//   toggleStatus(task: any): void {
//     const updatedStatus = task.status === 'open' ? 'closed' : 'open';
//     this.taskService
//       .updateTask(task._id, { status: updatedStatus })
//       .subscribe(() => {
//         task.status = updatedStatus;
//       });
//   }

//   applyFilter(): void {
//     this.filteredTasks = this.tasks.filter(
//       (task) =>
//         task.entity_name
//           .toLowerCase()
//           .includes(this.filterText.toLowerCase()) ||
//         task.task_type.toLowerCase().includes(this.filterText.toLowerCase())
//     );
//     this.sortTasks();
//   }

//   onSortChange(event: any): void {
//     this.sortCriteria = event.target.value;
//     this.sortTasks();
//   }

//   sortTasks(): void {
//     this.filteredTasks = this.filteredTasks.sort((a, b) => {
//       if (a[this.sortCriteria] < b[this.sortCriteria]) return -1;
//       if (a[this.sortCriteria] > b[this.sortCriteria]) return 1;
//       return 0;
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  filterText: string = '';
  sortCriteria: string = 'entity_name'; // Default sorting by entity name

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load tasks from the server with cache control headers
  loadTasks(): void {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    });

    this.taskService.getTasks({ headers }).subscribe(
      (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  // Delete a task and update the task list
  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks(); // Reload the task list after deletion
      });
    }
  }

  // Toggle the status of a task
  toggleStatus(task: any): void {
    const updatedStatus = task.status === 'open' ? 'closed' : 'open';
    this.taskService
      .updateTask(task._id, { status: updatedStatus })
      .subscribe(() => {
        task.status = updatedStatus;
      });
  }

  // Apply filter based on the user input
  applyFilter(): void {
    this.filteredTasks = this.tasks.filter(
      (task) =>
        task.entity_name
          .toLowerCase()
          .includes(this.filterText.toLowerCase()) ||
        task.task_type.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.sortTasks();
  }

  // Handle the sorting of tasks based on selected criteria
  onSortChange(event: any): void {
    this.sortCriteria = event.target.value;
    this.sortTasks();
  }

  // Sort the tasks based on selected criteria
  sortTasks(): void {
    this.filteredTasks = this.filteredTasks.sort((a, b) => {
      if (a[this.sortCriteria] < b[this.sortCriteria]) return -1;
      if (a[this.sortCriteria] > b[this.sortCriteria]) return 1;
      return 0;
    });
  }
}
