export interface Task {

    id: string;
    name: string;
    description: string;
    taskStatus: 'pending' | 'in-progress' | 'completed';
    dueDate: Date;
}
