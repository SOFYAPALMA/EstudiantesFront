import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NuevoEstudianteComponent } from './Pages/nuevoestudiante/nuevoestudiante.component';
import { EstudiantesComponent } from './Pages/estudiantes/estudiantes.component';
import { AsociarMateriaComponent } from './Pages/asociar-materia/asociar-materia.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'nuevoestudiante', canActivate: [AuthGuard], component: NuevoEstudianteComponent },
  { path: 'estudiantes', canActivate: [AuthGuard], component: EstudiantesComponent },
  { path: 'asociar-materia', canActivate: [AuthGuard], component: AsociarMateriaComponent },
  { path: 'login', component: LoginComponent },
  
    
];
