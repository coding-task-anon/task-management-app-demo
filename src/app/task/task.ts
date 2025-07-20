export interface Task {

    id: string;
    name: string;
    description: string;
    taskStatus: null | 'pending' | 'in-progress' | 'completed';
    dueDate: Date | null;
}
