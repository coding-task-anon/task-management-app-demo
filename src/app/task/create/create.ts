import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task-service';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  title: string = '';
  description: string = '';
  dueDate: Date | null = null;
  error: string | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  async submit() {
    if (this.title.trim().length === 0 || this.dueDate === null) {
      this.error = 'Title and Due Date fields are required.';
      return;
    }
    if (this.title.trim().length > 255) {
      this.error = 'Title cannot exceed 255 characters.';
      return;
    }
    if (this.description.trim().length > 2000) {
      this.error = 'Description cannot exceed 2000 characters.';
      return;
    }
    console.log(
      'Submitting task with title:',
      this.title,
      'and due date:',
      this.dueDate
    );
    const dueDateObj = new Date(this.dueDate);
    if (isNaN(dueDateObj.getTime())) {
      this.error = 'Invalid date format.';
      return;
    }
    if (dueDateObj < new Date()) {
      this.error = 'Due Date cannot be in the past.';
      return;
    }

    const task: Task = {
      id: '', // This will be set by the backend or service
      title: this.title.trim(),
      description: this.description.trim(),
      taskStatus: null,
      dueDate: this.dueDate,
    };

    try {
      const response = await firstValueFrom(this.taskService.createTask(task));
      console.log('Task created successfully:', response);
      console.log('New Task ID:', response.id);

      // Clear form
      this.resetForm();

      alert('Task created successfully with ID: ' + response.id);

      // Navigate after successful creation
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error creating task:', error);
      this.error = 'Failed to create task. Please try again.';
      // Don't navigate on error
    }
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.dueDate = null;
    this.error = '';
  }
}
