import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { catchError, Observable, throwError } from 'rxjs';
import { Estudiantes } from '../Models/Estudiantes';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Estudiantes/';

  constructor() { }

   // metodo para solicitud tipo Get que trae la lista de Estudiantes
   lista(){
    return this.http.get<RespuestaAPI>(this.apiUrl + "ConsultarEstudiantes");
  }

   //metodo para la consulta por id de Estudiantes
   obtener(id: string): Observable<RespuestaAPI> {
    console.log('gg', id);
    return this.http.get<RespuestaAPI>(
      this.apiUrl + "ConsultarEstudianteId?id=" + id
    ).pipe(
      catchError(error => {
        console.error('Error al obtener Estudiante:', error);
        return throwError(() => error);
      })
    );
  }

    //metodo tipo post para crear Estudiante
    nuevoEstudiante(value: Estudiantes): Observable<RespuestaAPI> {
    console.log('nuevo Estudiante', value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<RespuestaAPI>(
      `${this.apiUrl}CrearEstudiante`,
      value,
      httpOptions
    );
  }
    //metodo tipo put para editar Estudiante
    editarProducto(objeto: Estudiantes): Observable<RespuestaAPI> {
      return this.http.put<RespuestaAPI>(
        `${this.apiUrl}ActualizarEstudiante`,
        objeto
      );
    }
  
    //metodo para la eliminar por id de Estudiante
    eliminar(id: string): Observable<RespuestaAPI> {
      return this.http.delete<RespuestaAPI>(`${this.apiUrl}EliminarEstudiante?id=${id}`).pipe(
        catchError(error => {
          console.error('Error al eliminar EliminarEstudiante:', error);
          return throwError(() => error);
        })
      );
    }
}
