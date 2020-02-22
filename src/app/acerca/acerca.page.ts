import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {

  constructor(private router: Router, private callNumber: CallNumber) { }

  ngOnInit() {
  }

  usoTelefono() {
    this.callNumber.callNumber("625412589", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
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
