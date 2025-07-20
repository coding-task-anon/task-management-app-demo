import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private apiUrl = 'http://localhost:8080/';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all tasks from the API
   * @returns Observable<Task[]>
   */
  getTasks(): Observable<Task[]> {
    this.log('Fetching tasks from API');
    
    return this.http.get<Task[]>(`${this.apiUrl}tasks/`, this.httpOptions)
      .pipe(
        tap(tasks => this.log(`Retrieved ${tasks.length} tasks`)),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /**
   * Retrieves a specific task by ID
   * @param taskId - The ID of the task to retrieve
   * @returns Observable<Task>
   */
  getTaskById(taskId: string): Observable<Task> {
    ;
    this.log(`Fetching task with ID: ${taskId}`);
  
    
    return this.http.get<Task>(`${this.apiUrl}tasks/${parseInt(taskId)}`, this.httpOptions)
      .pipe(
        tap(task => this.log(`Retrieved task: ${task.id}`)),
        catchError(this.handleError<Task>(`getTaskById id=${taskId}`))
      );
  }

  /**
   * Creates a new task
   * @param task - The task object to create
   * @returns Observable<Task>
   */
  createTask(task: Task): Observable<Task> {
    this.log('Creating new task');
    return this.http.post<Task>(`${this.apiUrl}tasks/`, task, this.httpOptions)
      .pipe(
        tap(newTask => this.log(`Created task with ID: ${newTask.id}`)),
        catchError(this.handleError<Task>('createTask'))
      );
  }

  /**
   * Updates an existing task
   * @param taskId - The ID of the task to update
   * @param task - The updated task object
   * @returns Observable<Task>
   */
  updateTask(taskId: string, task: Task): Observable<Task> {
    this.log(`Updating task with ID: ${taskId}`);
    
    return this.http.put<Task>(`${this.apiUrl}tasks/${taskId}`, task, this.httpOptions)
      .pipe(
        tap(updatedTask => this.log(`Updated task: ${updatedTask.id}`)),
        catchError(this.handleError<Task>(`updateTask id=${taskId}`))
      );
  }

  /**
   * Deletes a task by ID
   * @param taskId - The ID of the task to delete
   * @returns Observable<void>
   */
  deleteTask(taskId: string): Observable<void> {
    this.log(`Deleting task with ID: ${taskId}`);
    
    return this.http.delete<void>(`${this.apiUrl}tasks/${taskId}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`Deleted task with ID: ${taskId}`)),
        catchError(this.handleError<void>(`deleteTask id=${taskId}`))
      );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      
      // Log error to console (in production, you might want to send to logging service)
      console.error(`${operation} failed:`, error);
      
      // Log user-friendly message
      this.log(`${operation} failed: ${this.getErrorMessage(error)}`);
      
      // Let the app keep running by returning an empty result or throwing error
      if (result !== undefined) {
        return new Observable(observer => {
          observer.next(result as T);
          observer.complete();
        });
      } else {
        return throwError(() => error);
      }
    };
  }

  /**
   * Extract a user-friendly error message from HttpErrorResponse
   * @param error - The HTTP error response
   * @returns string - User-friendly error message
   */
  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return `Client error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      switch (error.status) {
        case 400:
          return 'Bad request. Please check your data.';
        case 401:
          return 'Unauthorized. Please log in.';
        case 403:
          return 'Forbidden. You do not have permission.';
        case 404:
          return 'Resource not found.';
        case 500:
          return 'Internal server error. Please try again later.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return `Server error: ${error.status} ${error.statusText}`;
      }
    }
  }

  /**
   * @param message - The message to log
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[TaskService] ${timestamp}: ${message}`);
  }
}