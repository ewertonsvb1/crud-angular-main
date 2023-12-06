import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { tap } from 'rxjs/internal/operators/tap';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';
  constructor(private httpClient: HttpClient) { }

  // aqui dentro do serviço, esse método está retornando uma lista de cursos
  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      // delay(15000),
      // tap(courses => console.log(courses))
    );
  }


  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>){
    if(record._id){
      return this.update(record);
    }
    return this.create(record);

  }

  private create(record: Partial<Course>){// Partial serve para dizer que aceita o ojbeto desde que ele tenha um dos atributos dele
    return this.httpClient.post<Course>(this.API, record).pipe(first());

  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
