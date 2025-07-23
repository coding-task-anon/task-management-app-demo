import { Component } from '@angular/core';
import { TaskService } from '../task-service';
import { Task } from '../task';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  imports: [RouterModule, FormsModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  allTasks: Task[] = [];
  tasks: Task[] = [];
  taskStatus: string = '';
  searchTerm: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  getTasksByStatus() {
    if (this.taskStatus === 'ALL' || this.taskStatus === '') {
      console.log('Showing all tasks');
      this.tasks = [...this.allTasks]; // Create a copy
    } else {
      console.log('Filtering by status:', this.taskStatus);
      this.tasks = this.allTasks.filter(
        (task) => task.taskStatus === this.taskStatus
      );
    }

    console.log('Tasks after filtering:', this.tasks);
  }

  searchTasks() {
    if (this.searchTerm.trim() === '' || this.searchTerm.length < 3) {
      this.tasks = [...this.allTasks]; // Reset to all tasks
    } else {
      this.tasks = this.allTasks.filter((task) => this.hasSearchTerm(task));
    }
    console.log('Tasks after search:', this.tasks);
  }

  private hasSearchTerm(task: Task): boolean {
    return (
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.allTasks = data; // Store original data
        this.tasks = [...data]; // Display copy
        console.log('Tasks loaded successfully', this.tasks);
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }
}
