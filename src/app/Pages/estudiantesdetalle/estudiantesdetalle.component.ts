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
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Estudiantes } from '../../Models/Estudiantes';
import { EstudiantesDetalleService } from '../../Services/estudiantesdetalle.service';


@Component({
  selector: 'app-estudiantesdetalle',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    CommonModule,    
    
  ],

  templateUrl: './estudiantesdetalle.component.html',
  styleUrl: './estudiantesdetalle.component.css',
})
export class EstudiantesDetalleComponent implements OnInit {
  private estudiantesDetalleServicio = inject(EstudiantesDetalleService);
  public estudiantesid: Estudiantes | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  libros: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID obtenido:', id);
      if (id) {
        this.obtenerEstudianteid(id);
      } else {
        console.log('ID no encontrado');
      }
    });
  }

  obtenerEstudianteid(id: string) {
    this.estudiantesDetalleServicio.obtener(id).subscribe({
      next: (res) => {
        console.log('Respuesta API:', res);
        console.log('Respuesta API 2:', res.data);

        if (res.success) {
          this.estudiantesid = res.data as unknown as Estudiantes;
          console.log('Respuesta 2:', this.estudiantesid);
        } else {
          console.log('S2 Estudiante no encontrado');
      }
    },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  ver(id: number) {
    this.router.navigate(['estudiantesdetalle'], { queryParams: { id: id ?? '0'  } });
  }

  retornar() {
    this.router.navigate(['estudiantes'], { queryParams: { 
    } });
  }

  onSubmit() {
    if (this.libros.valid) {
      console.log(this.libros.value);
    }
  }
  
  
}

