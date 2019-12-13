import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {

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

  navigateToInicio() {
		this.router.navigate(["/"]);
	}

}
