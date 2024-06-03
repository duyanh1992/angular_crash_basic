import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  handleDeleteTask(task: Task) {
    const filteredTask = this.tasks.filter((t) => task.id !== t.id);

    this.taskService
      .deleteTask(task)
      .subscribe(() => (this.tasks = filteredTask));
  }

  handleDblTask(task: Task) {
    task.reminder = !task.reminder;

    this.taskService.updateTaskReminder(task).subscribe();
  }
}
