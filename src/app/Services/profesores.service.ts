import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Profesores } from '../Models/Profesores';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Profesores/';

  constructor(private httpClient: HttpClient) {}

  // metodo para solicitud tipo Get que trae la lista de Profesores
  lista() {
    return this.http.get<RespuestaAPI>(this.apiUrl + 'ConsultarProfesores');
  }

  // metodo para la consulta por id de Profesor
  obtener(id: string): Observable<RespuestaAPI> {
    console.log('gg', id);
    return this.http
      .get<RespuestaAPI>(this.apiUrl + 'ConsultarProfesorId?id=' + id)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener Profesor:', error);
          return throwError(() => error);
        })
      );
  }
}
