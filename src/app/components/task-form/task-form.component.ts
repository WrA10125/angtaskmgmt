import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute for route params

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  task = {
    entity_name: '',
    task_type: '',
    time: '',
    contact_person: '',
    note: '',
    status: 'open',
  };
  isEditMode = false; // Flag to determine if we are in edit mode
  taskId: string | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check for the task ID in the route params
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true; // Switch to edit mode
        this.taskId = id; // Set task ID for editing
        this.loadTask(id); // Load the task data for editing
      }
    });
  }

  // Fetch task details for editing
  loadTask(id: string): void {
    this.taskService.getTaskById(id).subscribe(
      (task) => {
        this.task = task; // Populate form with the fetched task data
      },
      (error) => {
        console.error('Error fetching task:', error);
        alert('Failed to load task for editing');
      }
    );
  }

  // Create or update a task depending on the mode (create or edit)
  createOrUpdateTask(): void {
    if (
      !this.task.entity_name ||
      !this.task.task_type ||
      !this.task.time ||
      !this.task.contact_person
    ) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.isEditMode && this.taskId) {
      this.updateTask(); // Call the update method if editing
    } else {
      this.createTask(); // Call the create method if creating
    }
  }

  // Create a new task
  createTask(): void {
    this.taskService.createTask(this.task).subscribe(
      (response) => {
        alert('Task created successfully!');
        this.router.navigate(['/task-list']); // Navigate to the task list
        this.resetForm(); // Reset form after creation
      },
      (error) => {
        console.error('Error creating task:', error);
        alert('Error occurred: ' + error.message);
      }
    );
  }

  // Update an existing task
  updateTask(): void {
    if (this.taskId) {
      this.taskService.updateTask(this.taskId, this.task).subscribe(
        (response) => {
          alert('Task updated successfully!');
          this.router.navigate(['/task-list']); // Navigate to the task list after update
        },
        (error) => {
          console.error('Error updating task:', error);
          alert('Error occurred: ' + error.message);
        }
      );
    }
  }

  // Reset the form
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
