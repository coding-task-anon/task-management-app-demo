export interface Task {
  id: string;
  title: string;
  description: string;
  taskStatus: null | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: Date | null;
}
