import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';

import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    taskServiceMock = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'deleteTask',
      'updateTask',
    ]);

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call loadTasks on ngOnInit', () => {
    taskServiceMock.getTasks.and.returnValue(of([]));
    component.ngOnInit();
    expect(taskServiceMock.getTasks).toHaveBeenCalled();
  });

  it('should call editTask when edit button is clicked', () => {
    const taskId = '1';
    const navigateSpy = spyOn(routerMock, 'navigate');
    component.editTask(taskId);
    expect(navigateSpy).toHaveBeenCalledWith([`/task-form/${taskId}`]);
  });

  it('should call deleteTask when delete button is clicked', () => {
    const taskId = '1';
    taskServiceMock.deleteTask.and.returnValue(of({ message: 'Task deleted' }));

    // Mocking confirmation
    spyOn(window, 'confirm').and.returnValue(true); // This is to handle the delete confirmation

    component.deleteTask(taskId);

    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(taskId);
    expect(component.tasks.length).toBe(0);
    expect(component.filteredTasks.length).toBe(0);
  });

  it('should not call deleteTask if cancel is pressed on delete confirmation', () => {
    const taskId = '1';
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteTask(taskId);
    expect(taskServiceMock.deleteTask).not.toHaveBeenCalled();
  });

  it('should call toggleStatus when toggle button is clicked', () => {
    const task = { _id: '1', status: 'open' };
    taskServiceMock.updateTask.and.returnValue(of({ message: 'Task updated' }));

    component.toggleStatus(task);

    expect(taskServiceMock.updateTask).toHaveBeenCalledWith(task._id, {
      status: 'closed',
    });
    expect(task.status).toBe('closed');
  });

  it('should filter tasks based on filter text', () => {
    const tasks = [
      { _id: '1', entity_name: 'Task 1', task_type: 'type1' },
      { _id: '2', entity_name: 'Task 2', task_type: 'type2' },
    ];
    component.tasks = tasks;
    component.filterText = 'task 1';
    component.applyFilter();

    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].entity_name).toBe('Task 1');
  });

  it('should sort tasks based on selected sort criteria', () => {
    const tasks = [
      { _id: '2', entity_name: 'B Task', task_type: 'type2' },
      { _id: '1', entity_name: 'A Task', task_type: 'type1' },
    ];
    component.tasks = tasks;
    component.sortCriteria = 'entity_name';
    component.sortTasks();

    expect(component.filteredTasks[0].entity_name).toBe('A Task');
    expect(component.filteredTasks[1].entity_name).toBe('B Task');
  });
});
