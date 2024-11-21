import { Component, OnInit } from '@angular/core';
import { ScheduleService, Subject } from '../services/schedule.service';

interface Task {
  id: number;
  subject: string;
  type: 'task' | 'reminder';
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
}

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {
  subjects: Subject[] = [];
  tasks: Task[] = [];
  currentDate = new Date().toISOString(); // Añadido aquí

  newTask: Omit<Task, 'id' | 'createdAt'> = {
    subject: '',
    type: 'task',
    title: '',
    description: '',
    dueDate: new Date().toISOString()
  };

  constructor(private scheduleService: ScheduleService) {
    // Asegúrar de que la fecha mínima sea la actual
    this.currentDate = new Date().toISOString();
  }

  ngOnInit() {
    this.scheduleService.subjects$.subscribe(subjects => {
      this.subjects = subjects;
    });

    // Verificar si hay tareas guardadas en el localStorage
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      try {
        // Intentar parsear las tareas del localStorage
        this.tasks = JSON.parse(savedTasks);
        console.log('Tareas recuperadas del localStorage:', this.tasks);
      } catch (error) {
        // Si ocurre un error durante el parseo, muestra un mensaje de error
        console.error('Error al recuperar las tareas de localStorage:', error);
        this.tasks = []; // Reiniciar la lista de tareas si hay un error
      }
    } else {
      console.log('No hay tareas guardadas en el localStorage.');
      this.tasks = []; // Si no hay tareas guardadas, inicializar la lista vacía
    }
  }

  addTask() {
    if (this.newTask.subject && this.newTask.title && this.newTask.dueDate) {
      const task: Task = {
        ...this.newTask,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      this.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      console.log('Tarea agregada:', task);
      
      // Reiniciar el formulario para agregar nuevas tareas
      this.newTask = {
        subject: '',
        type: 'task',
        title: '',
        description: '',
        dueDate: new Date().toISOString()
      };
    } else {
      console.error('Por favor, complete todos los campos requeridos.');
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    console.log('Tarea eliminada:', task);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
