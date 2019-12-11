import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pilotos } from '../pilotos';
import { FirestoreService } from '../firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

	document: any = {
	id: "",
	data: {} as Pilotos
	}

	id=null;
	pilotosEditando: Pilotos;

  constructor(private activatedRoute: ActivatedRoute, 
    private firestoreService: FirestoreService,
    private router: Router,
    public alertController: AlertController) {
	this.pilotosEditando = {} as Pilotos;
	this.id = this.activatedRoute.snapshot.paramMap.get("id");
	this.firestoreService.consultarPorId("pilotos", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
	if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
	} else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Pilotos;
	} 
    });
	}

	ngOnInit() {
	}

	clicBotonBorrar() {
	this.firestoreService.borrar("pilotos", this.id).then(() => {
		// Limpiar datos de pantalla
		this.pilotosEditando = {} as Pilotos;
	})
	this.navigateToInicio();
	}
  
	clicBotonInsertar() {
	this.firestoreService.insertar("pilotos", this.document.data).then(() => {
		console.log('Piloto creado correctamente!');
		this.pilotosEditando = {} as Pilotos;
	}, (error) => {
		console.error(error);
	});
	}

	clicBotonModificar() {
	this.firestoreService.actualizar("pilotos", this.id, this.document.data).then(() => {
		// Limpiar datos de pantalla
		this.document.data = {} as Pilotos;
		this.navigateToInicio();
	})
	}

	navigateToInicio() {
		this.router.navigate(["/"]);
	}

	async presentAlertConfirmInsertar() {
			const alert = await this.alertController.create({
				header: 'Confirmar',
				message: '¿Quieres añadir el piloto <strong>'+ this.document.data.nombre +'</strong>?',
				buttons: [
					{
						text: 'Descartar',
						cssClass: 'secondary',
						handler: (blah) => {
							console.log('Confirm Cancel');
							this.navigateToInicio();
						}
					},
					{
						text: 'Cancelar',
						role: 'cancel',
						cssClass: 'secondary',
						handler: (blah) => {
							console.log('Confirm Cancel');
						}
					},
					{
						text: 'Guardar',
						handler: () => {
							console.log('Confirm Okay');
							this.clicBotonInsertar();
						}
					}
				]
			});

			await alert.present();
	}

	async presentAlertConfirmModificar() {
			const alert = await this.alertController.create({
				header: 'Confirmar',
				message: '¿Quieres confirmar los cambios en el piloto <strong>'+ this.document.data.nombre +'</strong>?',
				buttons: [
					{
						text: 'Descartar',
						cssClass: 'secondary',
						handler: (blah) => {
							console.log('Confirm Cancel');
							this.navigateToInicio();
						}
					},
					{
						text: 'Cancelar',
						role: 'cancel',
						cssClass: 'secondary',
						handler: (blah) => {
							console.log('Confirm Cancel');
						}
					},
					{
						text: 'Guardar',
						handler: () => {
							console.log('Confirm Okay');
							this.clicBotonModificar();
						}
					}
				]
			});
			await alert.present();
	}

	async presentAlertConfirmBorrar() {
			const alert = await this.alertController.create({
				header: 'Confirmar',
				message: '¿Quieres borrar el piloto <strong>'+ this.document.data.nombre +'</strong>?',
				buttons: [
					{
						text: 'Descartar',
						cssClass: 'secondary',
						handler: (blah) => {
							console.log('Confirm Cancel');
							this.navigateToInicio();
						}
					},
					{
						text: 'Cancelar',
						role: 'cancel',
						cssClass: 'secondary',
						handler: (blah) => {
							console.log('Confirm Cancel');
						}
					},
					{
						text: 'Borrar',
						handler: () => {
							console.log('Confirm Okay');
							this.clicBotonBorrar();
						}
					}
				]
			});
			await alert.present();
		}
}