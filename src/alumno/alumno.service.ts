import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnoService {
  private alumnos: Alumno[] = [];

  create(createAlumnoDto: CreateAlumnoDto) {
    const alumno: Alumno ={
      id: uuid(),
      promedio: (createAlumnoDto.nota1 + createAlumnoDto.nota2)/2,
      ...createAlumnoDto,
    }
  this.alumnos.push(alumno);
  return alumno;
  }

  findAll() {
    return this.alumnos;
  }

  findOne(id: string) {
    const alumno = this.alumnos.find(alumno=>alumno.id===id);
    if(!alumno){
      throw new NotFoundException(`Alumno with id #${id} not found!`);
    }
    return alumno;
  }

  update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
    let alumnoBD = this.findOne(id);
    this.alumnos = this.alumnos.map((alumno) => {
      if (alumno.id === id) {
        alumnoBD = { ...alumnoBD, ...updateAlumnoDto,
          promedio: (updateAlumnoDto.nota1 + updateAlumnoDto.nota2) / 2,
          id }
        return alumno;
      }
    });
    return alumnoBD;
  }

  remove(id: string) {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
  }
}