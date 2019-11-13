import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Pilotos } from '../pilotos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pilotosEditando: Pilotos;

  arrayColeccionPilotos: any = [{
    id: "",
    data: {} as Pilotos
   }];

  constructor(private firestoreService: FirestoreService) {
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

  clicBotonInsertar() {
    this.firestoreService.insertar("pilotos", this.pilotosEditando).then(() => {
      console.log('Piloto añadido correctamente!');
      this.pilotosEditando= {} as Pilotos;
    }, (error) => {
      console.error(error);
    });
  }

  idPilotoSelec: string;

  selecPiloto(pilotoSelec) {
    console.log("Piloto seleccionada: ");
    console.log(pilotoSelec);
    this.idPilotoSelec = pilotoSelec.id;
    this.pilotosEditando.nombre = pilotoSelec.data.nombre;
    this.pilotosEditando.equipo = pilotoSelec.data.equipo;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("pilotos", this.idPilotoSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPilotos();
      // Limpiar datos de pantalla
      this.pilotosEditando = {} as Pilotos;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("pilotos", this.idPilotoSelec, this.pilotosEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPilotos();
      // Limpiar datos de pantalla
      this.pilotosEditando = {} as Pilotos;
    })
  }

}
