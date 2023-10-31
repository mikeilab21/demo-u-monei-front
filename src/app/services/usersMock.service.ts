import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService {

  getUsersMock() {
    return [
      {
        id: '1',
        code: '123456789', // Cédula de identidad
        name: 'Juan Pérez',
        mail: 'juan@example.com',
        telephone: 1234567890,
        plan: 'Plan 30',
        requestedAmount: 5000,
        valid: 'Sí',
        approval: 'Aprobado',
        status: 'En proceso'
      },
      {
        id: '2',
        code: '987654321', // Cédula de identidad
        name: 'María Gómez',
        mail: 'maria@example.com',
        telephone: 9876543210,
        plan: 'Plan 60',
        requestedAmount: 8000,
        valid: 'Sí',
        approval: 'Rechazado',
        status: 'Completado'
      },
      {
        id: '3',
        code: '555555555', // Cédula de identidad
        name: 'Pedro Rodríguez',
        mail: 'pedro@example.com',
        telephone: 5555555555,
        plan: 'Plan 90',
        requestedAmount: 3000,
        valid: 'No',
        approval: 'Pendiente',
        status: 'Por confirmar'
      }
    ]
  }

  getUsers() {
    return Promise.resolve(this.getUsersMock());
}
}
