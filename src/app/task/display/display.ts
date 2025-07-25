import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task-service';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-display',
  imports: [RouterModule, FormsModule, DatePipe],
  templateUrl: './display.html',
  styleUrl: './display.css',
})
export class Display {
  title: string = '';
  description: string = '';
  taskStatus: null | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' = null;
  id: string = '';
  dueDate: Date | null = null;
  error: string | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    const taskId = this.router.url.split('/')[2];
    console.log(`Editing task with ID: ${taskId}`);
    if (taskId) {
      this.id = taskId;
      this.taskService.getTaskById(this.id).subscribe(
        (task: Task) => {
          this.title = task.title;
          this.description = task.description;
          this.taskStatus = task.taskStatus;
          this.dueDate = task.dueDate;
        },
        (error) => {
          console.error('Error fetching task', error);
          this.error = 'Failed to load task details.';
        }
      );
    }
  }
}
