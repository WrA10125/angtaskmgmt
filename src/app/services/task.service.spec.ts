import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import {
  
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5000/api/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    const dummyTasks = [
      {
        _id: '1',
        entity_name: 'Entity 1',
        task_type: 'Type 1',
        time: '2025-01-01',
        status: 'open',
      },
      {
        _id: '2',
        entity_name: 'Entity 2',
        task_type: 'Type 2',
        time: '2025-02-01',
        status: 'closed',
      },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should fetch a single task by id', () => {
    const dummyTask = {
      _id: '1',
      entity_name: 'Entity 1',
      task_type: 'Type 1',
      time: '2025-01-01',
      status: 'open',
    };

    service.getTaskById('1').subscribe((task) => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTask);
  });

  it('should create a task', () => {
    const newTask = {
      entity_name: 'New Entity',
      task_type: 'New Task',
      time: '2025-03-01',
      contact_person: 'John Doe',
      status: 'open',
    };
    const response = { message: 'Task created', task_id: '123' };

    service.createTask(newTask).subscribe((res) => {
      expect(res.message).toBe('Task created');
      expect(res.task_id).toBe('123');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should update a task', () => {
    const updatedTask = {
      entity_name: 'Updated Entity',
      task_type: 'Updated Task',
      time: '2025-03-01',
      status: 'closed',
    };

    service.updateTask('1', updatedTask).subscribe((res) => {
      expect(res.message).toBe('Task updated');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Task updated' });
  });

  it('should delete a task', () => {
    service.deleteTask('1').subscribe((res) => {
      expect(res.message).toBe('Task deleted');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Task deleted' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
