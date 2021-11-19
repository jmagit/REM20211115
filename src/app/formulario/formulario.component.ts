import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RESTDAOService } from '../base-code/RESTDAOService';
import { NotificationService, NotificationType } from '../common-services';
import { AUTH_REQUIRED } from '../security';

@Injectable( { providedIn: 'root'})
class PersonasDao extends RESTDAOService<any, number> {
   constructor(http: HttpClient) {
    super(http, 'personas', { withCredentials: true, context: new HttpContext().set(AUTH_REQUIRED, true) });
  }
  override query(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseUrl + '?_sort=nombre', this.option);
  }
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  elemento: any = {};
  isNew = true;

  constructor(private http: HttpClient, private notify: NotificationService, private dao: PersonasDao) { }

  ngOnInit(): void {
  }

  add() {
    this.elemento = {};
    this.isNew = true;
  }

  get() {
    // this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', nif: null, edad: 99 };
    // this.isNew = false;
    if(this.elemento.id)
      //this.http.get(`/api/personas/${this.elemento.id}`)
      this.dao.get(this.elemento.id)
        .subscribe({
          next: data => {
            this.elemento = data;
            this.isNew = false;
          },
          error: err => this.notify.add(err.message)
        })
  }

  send() {
    if (this.isNew)
      //this.http.post(`http://localhost:4321/api/personas`, this.elemento)
      this.dao.add(this.elemento)
        .subscribe({
          next: data => this.notify.add("Añadido", NotificationType.warn),
          error: err => this.notify.add(err.message)
        })
    else
      // this.http.put(`http://localhost:4321/api/personas/${this.elemento.id}`, this.elemento)
      this.dao.change(this.elemento.id, this.elemento)
        .subscribe({
          next: data => this.notify.add("Modificado", NotificationType.warn),
          error: err => this.notify.add(err.message)
        })
  }
}
