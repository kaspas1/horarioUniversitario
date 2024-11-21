import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // Limpia localStorage cuando la página se recarga
    window.addEventListener('beforeunload', () => {
      localStorage.clear();
      console.log('Local storage limpiado al recargar la página');
    });
  }
}