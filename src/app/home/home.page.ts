import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Pilotos } from '../pilotos';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  arrayColeccionPilotos: any = [{
    id: "",
    data: {} as Pilotos
  }];

  pilotosEditando: Pilotos;
  idPilotoSelec: string;
  
  userEmail: String = "";
	userUID: String = "";
	isLogged: boolean;

  constructor(private firestoreService: FirestoreService, private router: Router, private authService: AuthService,
    public afAuth: AngularFireAuth,
    private toastController: ToastController) {
    // Crear una tarea vacía
    this.pilotosEditando = {} as Pilotos;
    this.obtenerListaPilotos();
  }


  ionViewDidEnter() {
		this.isLogged = false;
		this.afAuth.user.subscribe(user => {
		if(user){
			this.userEmail = user.email;
			this.userUID = user.uid;
			this.isLogged = true;
		}
		})
	}

	async logout(){
		const toast = await this.toastController.create({
			message: 'Has cerrado sesión',
			duration: 3000
		});
		
      this.authService.doLogout()
      .then(res => {
        this.userEmail = "";
        this.userUID = "";
        this.isLogged = false;
        console.log(this.userEmail);
        toast.present();
      }, err => console.log(err));
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
  navigateToMapa() {
    this.router.navigate(["/mapa/"]);
  }
}
