import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task-service';
import { Task } from '../task';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [RouterModule, ReactiveFormsModule], // Added ReactiveFormsModule
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Fixed: Added 'this.' before form
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      dueDate: [null, [Validators.required, CustomValidators.futureDateOnly()]],
    });
  }

  async submit() {
    // Reset error
    this.error = null;

    // Check if form is valid
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Show validation errors
      this.error = 'Please fix the form errors before submitting.';
      return;
    }

    // Get form values
    const formValues = this.form.value;

    console.log('Submitting task:', formValues);

    const task: Task = {
      id: '', // This will be set by the backend or service
      name: formValues.name.trim(),
      description: formValues.description?.trim() || '',
      taskStatus: null,
      dueDate: formValues.dueDate,
    };

    try {
      const response = await firstValueFrom(this.taskService.createTask(task));
      console.log('Task created successfully:', response);
      console.log('New Task ID:', response.id);

      // Reset form
      this.form.reset();
      this.error = null;

      alert('Task created successfully with ID: ' + response.id);

      // Navigate after successful creation
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error creating task:', error);
      this.error = 'Failed to create task. Please try again.';
    }
  }

  // Helper methods for template
  get nameControl() {
    return this.form.get('name');
  }

  get dueDateControl() {
    return this.form.get('dueDate');
  }

  get descriptionControl() {
    return this.form.get('description');
  }
}
