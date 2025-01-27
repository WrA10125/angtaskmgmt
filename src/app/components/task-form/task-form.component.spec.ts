import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    taskServiceMock = jasmine.createSpyObj('TaskService', [
      'createTask',
      'updateTask',
      'getTaskById',
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [TaskFormComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call updateTask when editing an existing task', () => {
    // Updated taskData to include 'note' and 'status'
    const taskData = {
      _id: '1',
      entity_name: 'Updated Entity',
      task_type: 'Updated Task',
      time: '2025-03-01',
      contact_person: 'John Doe',
      note: 'Updated task note', // Added missing 'note' property
      status: 'open', // Added missing 'status' property
    };

    taskServiceMock.updateTask.and.returnValue(of({ message: 'Task updated' }));

    component.isEditMode = true;
    component.task = taskData; // Now includes 'note' and 'status'
    component.updateTask();
    expect(taskServiceMock.updateTask).toHaveBeenCalledWith('1', taskData);
  });

  it('should call loadTask when task ID is provided for editing', () => {
    const taskId = '1';
    taskServiceMock.getTaskById.and.returnValue(
      of({
        _id: taskId,
        entity_name: 'Entity',
        task_type: 'Type',
        time: '2025-03-01',
        contact_person: 'John Doe',
        note: 'Task note',
        status: 'open',
      })
    );

    component.ngOnInit();
    expect(taskServiceMock.getTaskById).toHaveBeenCalledWith(taskId);
  });
});
