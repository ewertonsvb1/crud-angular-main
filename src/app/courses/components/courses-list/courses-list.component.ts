import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {

 @Input() courses: Course[] = [];
 @Output() add = new EventEmitter(false); // eventos que estão saindo ( eventEmitter= emissor de eventos)
 @Output() edit = new EventEmitter(false);
 @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name','category', 'actions'];

  constructor (){

  }

  onAdd(){
   this.add.emit(true); // this.router.navigate(['new'], {relativeTo:this.route}); // faz com que a rota "NEW", seja relativa a rota que já "estou".
  }

  onEdit( course: Course){//  tipar o curso que é do tipo Objeto Curso
    this.edit.emit(course);

  }

  onDelete( course: Course){
    this.delete.emit(course);
  }

}
