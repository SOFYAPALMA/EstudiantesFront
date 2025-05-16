import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Login } from '../Models/Login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7108';
  private currentUser: any = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) {

    console.log("ctr auth service Service");
    this.loadCurrentUser();
  }
  private loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  iniciarSesion(usuario: Login): Observable<RespuestaAPI> {
    console.log(' auth 1', usuario);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return new Observable((subscriber) => {
      this.httpClient
        .post<RespuestaAPI>(
          this.API_URL +
            '/Validate?correo=' +
            usuario.correo +
            '&password=' +
            usuario.password,
          {}
        )
        .subscribe((data) => {
          //some stuff
          console.log('auth service', data);
          subscriber.next(data);
        });
    });
  } 
  
  logout() {
    // Limpiar datos de sesión
    //localStorage.removeItem('token');
    //localStorage.removeItem('userData');

    // Notificación
    this.snackBar.open('Sesión cerrada correctamente', 'Cerrar', {
      duration: 3000
    });
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}


