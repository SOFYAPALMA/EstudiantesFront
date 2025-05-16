import { Profesores } from "./Profesores";
import { Materia } from "./Materia";
export interface Estudiantes{
   
    id : number;
    nombre :  string;
    correo : string;
    password :  string;

    profesores : Profesores[];
    materia : Materia[];

}