import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Materias/'

  constructor() { }

  // metodo para solicitud tipo Get que trae la lista de Materias

  lista() {
    return this.http.get<RespuestaAPI>(this.apiUrl + "ConsultarMaterias");
  }

  // metodo para la consulta por id de Materias
  obtener(id: string): Observable<RespuestaAPI> {
    console.log('gg', id);
    return this.http.get<RespuestaAPI>(
      this.apiUrl + "ConsultarMateriaId?id=" + id
    ).pipe(
      catchError(error => {
        console.error('Error al obtener Materia:', error);
        return throwError(() => error);
      })
    );
  }

}
