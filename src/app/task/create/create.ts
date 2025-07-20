import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task-service';
import { Task } from '../task';
import{FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {

  name: string = '';
  description: string = '';
  dueDate: Date | null = null;
  error: string | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

    submit(){
      
      if (!this.name === null || !this.description === null || !this.dueDate === null) {
          this.error = "Title and Body fields are required.";
      return;
      }

        const task: Task = {
          id: '', // This will be set by the backend or service
          name: this.name,
          description: this.description,
          taskStatus: null, // Default status
          dueDate: this.dueDate
        }

        
        this.taskService.createTask(task).subscribe();
      
        alert('Task created successfully!');
        this.router.navigate(['/tasks']);
    }
  }


