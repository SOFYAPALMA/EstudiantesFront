import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';

import { catchError, Observable, throwError } from 'rxjs';
import { EstudianteMateria } from '../Models/EstudianteMateria';

@Injectable({
  providedIn: 'root',
})
export class EstudianteMateriaService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'EstudianteMateria/';

  constructor(private httpClient: HttpClient) {}

  // Metodo para solicitud tipo Get que trae la lista de EstudianteMateria
  lista() {
    return this.http.get<RespuestaAPI>(this.apiUrl + 'ConsultarEstMat');
  }

  // metodo para la consulta por id de EstudianteMateria
  obtener(id: string): Observable<RespuestaAPI> {
    console.log('gg', id);
    return this.http
      .get<RespuestaAPI>(this.apiUrl + 'ConsultarEstMatId?id=' + id)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener EstudianteMateria:', error);
          return throwError(() => error);
        })
      );
  }

  asociarMateria(payload: {
    estudianteId: string;
    materiaId: string;
  }): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(
      `${this.apiUrl}AsociarMateria`,
      payload
    );
  }
}
