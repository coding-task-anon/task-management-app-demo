import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task-service';
import { Task } from '../task';
import{FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [RouterModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {
  
  name: string = '';
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
          this.name = task.name;
          this.description = task.description;
          this.taskStatus = task.taskStatus;
          this.dueDate = task.dueDate;
        },
        error => {
          console.error('Error fetching task', error);
          this.error = 'Failed to load task details.';
        }
      );
    }
  }

    submit(){
      
      if (this.name.trim().length < 0 || this.description.trim().length < 0 || this.dueDate === null) {
          this.error = "Title and Body fields are required.";
      return;
      }

        const task: Task = {
          id: '', // This will be set by the backend or service
          name: this.name,
          description: this.description,
          taskStatus: this.taskStatus, // Default status
          dueDate: this.dueDate
        }

        
        let createdTask = this.taskService.updateTask(this.id, task).subscribe(
          (response: Task) => {
            console.log('Task updated successfully:', response);
            alert('Task updated successfully with ID: ' + response.id);
          },
          (error) => {
            console.error('Error creating task:', error);
            this.error = 'Failed to create task. Please try again.';
          }
        );
        this.router.navigate(['/tasks/' + this.id]);
    }

}
