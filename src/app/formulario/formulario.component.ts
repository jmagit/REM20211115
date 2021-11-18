import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  elemento: any = {};
  isNew = true;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.elemento = {};
    this.isNew = true;
  }

  get() {
    this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', nif: null, edad: 99 };
    this.isNew = false;
  }

  send() {
    if (this.isNew)
      alert(`Create: ${JSON.stringify(this.elemento)}`)
    else
      alert(`Update: ${JSON.stringify(this.elemento)}`)
  }
}
