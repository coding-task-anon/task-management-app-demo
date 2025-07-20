import { Routes } from '@angular/router';
import { Index } from './task/index';
import { Create } from './task/create/create';
import { Edit } from './task/edit/edit';
import { Display } from './task/display/display';

export const routes: Routes = [
    {path: "", redirectTo: "tasks", pathMatch: "full"},
    { path: "tasks", component: Index },
    { path: "tasks/create", component: Create },
    { path: "tasks/:taskId/edit", component: Edit },
    { path: "tasks/:taskId", component: Display }

];
