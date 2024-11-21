import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  credentials = {
    email: '',
    password: ''
  };

  validationErrors = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    // Resetear errores
    this.validationErrors = {
      email: '',
      password: ''
    };

    // Validar formato de email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!this.credentials.email || !emailPattern.test(this.credentials.email)) {
      this.validationErrors.email = 'Por favor ingrese un correo electrónico válido';
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message: 'Por favor ingrese un correo electrónico en formato válido',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar que los campos no estén vacíos
    if (!this.credentials.password) {
      this.validationErrors.password = 'La contraseña es requerida';
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Si pasa todas las validaciones, navega  a schedule
    this.router.navigate(['/schedule']);
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Restauración de Contraseña',
      subHeader: 'Servicio al Cliente',
      message: 'Por favor contacte con servicio al cliente para restaurar su contraseña.',
      buttons: ['OK']
    });
    await alert.present();
  }
}