import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Subject {
  id: number;
  name: string;
  professor: string;
  classroom: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  subjects: Subject[] = [];
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  colors: string[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];
  
  newSubject: Subject = {
    id: 0,
    name: '',
    professor: '',
    classroom: '',
    day: '',
    startTime: '',
    endTime: '',
    color: 'primary'
  };

  selectedSegment = 'list';

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    // Intentar cargar las materias desde localStorage
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      this.subjects = JSON.parse(savedSubjects);
      console.log('Materias cargadas desde localStorage:', this.subjects);
    }
  }

  async addSubject() {
    if (this.validateSubject()) {
      this.newSubject.id = Date.now();  // Asigna un ID único
      this.newSubject.color = this.colors[Math.floor(Math.random() * this.colors.length)];  // Asigna un color aleatorio
      this.subjects.push({...this.newSubject});

      // Guardar las materias en localStorage
      localStorage.setItem('subjects', JSON.stringify(this.subjects));

      // Reiniciar el formulario
      this.newSubject = {
        id: 0,
        name: '',
        professor: '',
        classroom: '',
        day: '',
        startTime: '',
        endTime: '',
        color: 'primary'
      };
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos requeridos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  validateSubject(): boolean {
    return !!(this.newSubject.name && this.newSubject.day && 
              this.newSubject.startTime && this.newSubject.endTime);
  }

  async deleteSubject(subject: Subject) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar la materia ${subject.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.subjects = this.subjects.filter(s => s.id !== subject.id);
            // Actualizar el localStorage después de eliminar
            localStorage.setItem('subjects', JSON.stringify(this.subjects));
          }
        }
      ]
    });
    await alert.present();
  }

  getSubjectsForDay(day: string): Subject[] {
    return this.subjects.filter(subject => subject.day === day);
  }
}
