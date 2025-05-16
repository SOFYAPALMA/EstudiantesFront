import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';


@Injectable({
  providedIn: 'root',
})
export class EstudiantesDetalleService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Materias/ConsultarMateriaId';

  constructor() {}

  id() {
    return this.http.get<RespuestaAPI>(this.apiUrl);
  }

  obtener(id: string) {
    return this.http.get<RespuestaAPI>(`${this.apiUrl}?id=${id}`);
  }

}
