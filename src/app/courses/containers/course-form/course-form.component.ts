import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

// formulario reativo
  form = this.formBuilder.group({
    _id:[''],
    name:['',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)]],
    category:['',[Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route  :  ActivatedRoute){

  }

  ngOnInit(): void{
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id:course._id,
      name:course.name,
      category:course.category
    })

  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSucess(), error => this.onError());

  }

  onCancel(){
    this.location.back();

  }

  private onSucess(){
    this._snackBar.open("Curso salvo com sucesso!", '', {duration:3000})
    this.onCancel();

  }

  private onError(){
    this._snackBar.open("Erro ao salvar curso!", '', {duration: 3000});
  }

  getErrorMessage(fieldName: string){

    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return '*Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLentgh = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínino precisa ser de ${requiredLentgh} caracteres.`;
    }
    if(field?.hasError('maxlength')){
      const requiredLentgh = field.errors ? field.errors['minlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLentgh} caracteres.`;
    }
    return 'Campo Inválido'
  }
}
