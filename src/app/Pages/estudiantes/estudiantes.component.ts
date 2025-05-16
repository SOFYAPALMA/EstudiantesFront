import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { RespuestaAPI } from '../../Models/RespuestaAPI';
import { query } from '@angular/animations';
import { Estudiantes } from '../../Models/Estudiantes';
import { EstudiantesService } from '../../Services/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
})
export class EstudiantesComponent implements OnInit, AfterViewInit {
  private estudiantesServicio = inject(EstudiantesService);
  public listaEstudiantes: MatTableDataSource<Estudiantes> =
    new MatTableDataSource<Estudiantes>();
  public displayedColumns: string[] = [
    'nombre',
    'accion',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  producto: any;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerEstudiantes();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.listaEstudiantes.paginator = this.paginator;
    }
    if (this.sort) {
      this.listaEstudiantes.sort = this.sort;
    }
  }

  obtenerEstudiantes() {
    this.estudiantesServicio.lista().subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.success && respuesta.data) {
          this.listaEstudiantes.data = respuesta.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      },
    });
  }

  ver(obj: Estudiantes) {
    console.log('id');
    this.router.navigate(['editar-estudiantes'], { queryParams: { id: obj } });
  }
  nuevo() {
    this.router.navigate(['asociar-materia']);
  }

  eliminar(id: string) {
    console.log('id');
    console.log('LLAMAREDITAR');
    if (confirm(`¿Desea eliminar el Estudiante?`)) {
      this.estudiantesServicio.eliminar(id).subscribe({
        next: (respuesta: RespuestaAPI) => {
          console.log(respuesta);
          if (respuesta.success) {
            this.obtenerEstudiantes();
          } else {
            alert(respuesta.message || 'No se pudo eliminar el Estudiante');
          }
        },
        error: (err) => {
          console.error(err);
          alert(
            'Error en la solicitud: ' + (err.error?.message || err.message)
          );
        },
      });
    }
  }
}
