  
import { Map,tileLayer,marker } from 'leaflet';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  map: Map;
  newMarker: any;
  address: string[];

  constructor(private router: Router) { }

  // The below function is added
  ionViewDidEnter() {
    this.loadMap();
  }
  // The below function is added
  loadMap() {
    this.map = new Map("IdMapa").setView([36.858453, -5.648913 ], 12);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>' })
      .addTo(this.map); 
      
      this.newMarker = marker([36.858453, -5.648913 ], {draggable: 
        true}).addTo(this.map);
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