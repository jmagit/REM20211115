import { Component, OnInit } from '@angular/core';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    { texto: 'Inicio', componente: HomeComponent, icono: 'home'},
    { texto: 'Demos', componente: DemosComponent, icono: 'chalkboard-teacher'},
    { texto: 'calculadora', componente: CalculadoraComponent, icono: 'calculator' },
  ]

  activo = this.menu[0].componente;

  constructor() { }

  seleccionar(indice: number) {
    this.activo = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
