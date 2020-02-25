import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToInfo() {
    this.router.navigate(["/info/"]);
  }

  navigateToEquipo() {
    this.router.navigate(["/equipo/"]);
  }

  navigateToMotor() {
    this.router.navigate(["/motor/"]);
  }

  navigateToAcerca() {
    this.router.navigate(["/acerca/"]);
  }

  navigateToMapa() {
    this.router.navigate(["/mapa/"]);
  }

  navigateToInicio() {
		this.router.navigate(["/"]);
	}

}
