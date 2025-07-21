import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TaskService } from './task-service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpClient, useValue: {} }, // Mock HttpClient
      ],
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
