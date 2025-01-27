import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router'; // Router for navigation
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  sortCriteria: string = 'entity_name';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        alert('Failed to load tasks');
      }
    );
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter((task) => task._id !== taskId);
          this.filteredTasks = this.filteredTasks.filter(
            (task) => task._id !== taskId
          );
        },
        (error) => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task');
        }
      );
    }
  }

  toggleStatus(task: any): void {
    const updatedStatus = task.status === 'open' ? 'closed' : 'open';
    this.taskService.updateTask(task._id, { status: updatedStatus }).subscribe(
      () => {
        task.status = updatedStatus;
      },
      (error) => {
        console.error('Error toggling task status:', error);
        alert('Failed to update task status');
      }
    );
  }

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

  onSortChange(event: any): void {
    this.sortCriteria = event.target.value;
    this.sortTasks();
  }

  sortTasks(): void {
    this.filteredTasks = this.filteredTasks.sort((a, b) => {
      if (a[this.sortCriteria] < b[this.sortCriteria]) return -1;
      if (a[this.sortCriteria] > b[this.sortCriteria]) return 1;
      return 0;
    });
  }

  editTask(taskId: string): void {
    this.router.navigate([`/task-form/${taskId}`]);
  }
}
