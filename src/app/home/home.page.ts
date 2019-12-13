import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Pilotos } from '../pilotos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pilotosEditando: Pilotos;
  idPilotoSelec: string;

  arrayColeccionPilotos: any = [{
    id: "",
    data: {} as Pilotos
  }];

  constructor(private firestoreService: FirestoreService, private router: Router) {
    // Crear una tarea vacía
    this.pilotosEditando = {} as Pilotos;
    this.obtenerListaPilotos();
  }

  obtenerListaPilotos(){
    this.firestoreService.consultar("pilotos").subscribe((resultadoConsultaPilotos) => {
      this.arrayColeccionPilotos = [];
      resultadoConsultaPilotos.forEach((datosPilotos: any) => {
        this.arrayColeccionPilotos.push({
          id: datosPilotos.payload.doc.id,
          data: datosPilotos.payload.doc.data()
        });
      })
    });
  }

  selecPiloto(pilotoSelec) {
    console.log("Piloto seleccionado: ");
    console.log(pilotoSelec);
    this.idPilotoSelec = pilotoSelec.id;
    this.pilotosEditando.nombre = pilotoSelec.data.nombre;
    this.pilotosEditando.equipo = pilotoSelec.data.equipo;
    this.pilotosEditando.numeroPilotos = pilotoSelec.data.numeroPilotos;
    this.pilotosEditando.motor = pilotoSelec.data.motor;
  }

  navigateToUser(id) {
    this.router.navigate(["/user/" + id]);
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
}
