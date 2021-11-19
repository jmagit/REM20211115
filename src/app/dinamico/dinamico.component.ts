import { Component, OnInit } from '@angular/core';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { ContactosComponent } from '../contactos';
import { DemosComponent } from '../demos/demos.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { LibrosComponent } from '../libros';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    { texto: 'libros', componente: LibrosComponent, icono: 'book'},
    { texto: 'Inicio', componente: HomeComponent, icono: 'home'},
    { texto: 'Demos', componente: DemosComponent, icono: 'chalkboard-teacher'},
    { texto: 'calculadora', componente: CalculadoraComponent, icono: 'calculator' },
    { texto: 'formulario', componente: FormularioComponent, icono: 'chalkboard'},
    { texto: 'contactos', componente: ContactosComponent, icono: 'address-book'},
  ]

  activo = this.menu[0].componente;

  constructor() { }

  seleccionar(indice: number) {
    this.activo = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
