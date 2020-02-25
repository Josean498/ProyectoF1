import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-motor',
  templateUrl: './motor.page.html',
  styleUrls: ['./motor.page.scss'],
})
export class MotorPage implements OnInit {

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
