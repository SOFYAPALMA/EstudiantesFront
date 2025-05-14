import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';

import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesorMateriaService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'ProfesorMateria/';

  constructor(private httpClient: HttpClient) {}

  // metodo para solicitud tipo Get que trae la lista de ProfesoresMateria
  lista() {
    return this.http.get<RespuestaAPI>(this.apiUrl + 'ConsultarMatProf');
  }

  // metodo para la consulta por id de ProfesoresMateria
  obtener(id: string): Observable<RespuestaAPI> {
    console.log('gg', id);
    return this.http
      .get<RespuestaAPI>(this.apiUrl + 'ConsultarMatProfId?id=' + id)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener ProfesoresMateria:', error);
          return throwError(() => error);
        })
      );
  }
}
