import { Component, 
  inject,
  OnInit } from '@angular/core';
import { EstudiantesService } from '../../Services/estudiantes.service';
import { MateriaService } from '../../Services/materia.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Estudiantes } from '../../Models/Estudiantes';
import { Materia } from '../../Models/Materia';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EstudianteMateriaService } from '../../Services/estudiantemateria.service';
import { RespuestaAPI } from '../../Models/RespuestaAPI';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-asociar-materia', 
  standalone: true, 
  imports: [
     MatCardModule,
        MatPaginatorModule,
        MatFormFieldModule,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatSortModule,
        MatSelectModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule
  ],
  templateUrl: './asociar-materia.component.html',
  styleUrl: './asociar-materia.component.css'
})
export class AsociarMateriaComponent implements OnInit {
  private estudiantesService = inject(EstudiantesService);
  private materiaService = inject(MateriaService);
  private estudianteMateriaService = inject(EstudianteMateriaService);
  private snackBar = inject(MatSnackBar);

  listaEstudiantes: Estudiantes[] = [];
  listaMaterias: Materia[] = [];

  estudianteSeleccionadoId: string = '';
  materiaSeleccionadaId: string = '';

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarMaterias();
  }

  cargarEstudiantes() {
    this.estudiantesService.lista().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.listaEstudiantes = res.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar estudiantes', err);
      },
    });
  }

  cargarMaterias() {
    this.materiaService.lista().subscribe({
      next: (res) => {
        console.log('Respuesta materias:', res);
        if (res.success && res.data) {
          this.listaMaterias = res.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar materias', err);
      },
    });
  }

  asociarMateria() {
    if (!this.estudianteSeleccionadoId || !this.materiaSeleccionadaId) return;

    const payload = {
      estudianteId: this.estudianteSeleccionadoId,
      materiaId: this.materiaSeleccionadaId,
    };

    this.estudianteMateriaService.asociarMateria(payload).subscribe({
      next: (res: RespuestaAPI) => {
        if (res.success) {
          this.snackBar.open('Materia asociada correctamente', 'Cerrar', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Error: ' + res.message, 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: (err) => {
        this.snackBar.open('Error al asociar materia', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
