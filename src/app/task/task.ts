export interface Task {

    id: string;
    name: string;
    description: string;
    taskStatus: null | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    dueDate: Date | null;
}
