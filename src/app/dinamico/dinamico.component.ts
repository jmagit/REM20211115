import { Component, OnInit } from '@angular/core';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    { texto: 'Demos', componente: DemosComponent, icono: 'accessible-icon'},
    { texto: 'Inicio', componente: HomeComponent, icono: 'home'},
  ]

  activo = this.menu[0].componente;

  constructor() { }

  seleccionar(indice: number) {
    this.activo = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
