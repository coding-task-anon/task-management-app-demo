import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task-service';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [RouterModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
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

  async submit() {
    if (this.id === '' || this.id === null) {
      this.error = 'Missing item id.';
      return;
    }
    if (this.title.trim().length < 0 || this.dueDate === null) {
      this.error = 'Title and Due Date fields are required.';
      return;
    }
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
      id: this.id,
      title: this.title,
      description: this.description,
      taskStatus: this.taskStatus,
      dueDate: this.dueDate,
    };

    try {
      const response = await firstValueFrom(
        this.taskService.updateTask(this.id, task)
      );
      console.log('Task updated successfully:', response);
      alert('Task updated successfully with ID: ' + response.id);

      // Navigate after successful update
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error updating task:', error);
      this.error = 'Failed to update task. Please try again.';
    }
  }
}
