import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pilotos } from '../pilotos';
import { FirestoreService } from '../firestore.service';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

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

	id = null;
	pilotosEditando: Pilotos;

	userEmail: String = "";
	userUID: String = "";
	isLogged: boolean;

	constructor(private activatedRoute: ActivatedRoute, 
		private firestoreService: FirestoreService,
		private router: Router,
		public alertController: AlertController,
		private loadingController: LoadingController,
		private toastController: ToastController,
		private imagePicker: ImagePicker,
		private socialSharing: SocialSharing,
		private authService: AuthService,
		public afAuth: AngularFireAuth
	) {
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
							this.navigateToInicio();
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
							this.navigateToInicio();
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
							this.navigateToInicio();
						}
					}
				]
			});
			await alert.present();
		}
		async uploadImagePicker(){
			// Mensaje de espera mientras se sube la imagen
			const loading = await this.loadingController.create({
				message: 'Please wait...'
			});
			// Mensaje de finalización de subida de la imagen
			const toast = await this.toastController.create({
				message: 'Image was updated successfully',
				duration: 3000
			});
			// Comprobar si la aplicación tiene permisos de lectura
			this.imagePicker.hasReadPermission().then(
				(result) => {
				  // Si no tiene permiso de lectura se solicita al usuario
				if(result == false){
					this.imagePicker.requestReadPermission();
				}
				else {
				  // Abrir selector de imágenes (ImagePicker)
					this.imagePicker.getPictures({
					maximumImagesCount: 1,  // Permitir sólo 1 imagen
					outputType: 1           // 1 = Base64
					}).then(
					(results) => {  // En la variable results se tienen las imágenes seleccionadas
					  // Carpeta del Storage donde se almacenará la imagen
						let nombreCarpeta = "imagenes";
					  // Recorrer todas las imágenes que haya seleccionado el usuario
					  //  aunque realmente sólo será 1 como se ha indicado en las opciones
						for (var i = 0; i < results.length; i++) {      
						// Mostrar el mensaje de espera
						loading.present();
						// Asignar el nombre de la imagen en función de la hora actual para
						//  evitar duplicidades de nombres        
						let nombreImagen = `${new Date().getTime()}`;
						// Llamar al método que sube la imagen al Storage
						this.firestoreService.uploadImage(nombreCarpeta, nombreImagen, results[i])
							.then(snapshot => {
							snapshot.ref.getDownloadURL()
								.then(downloadURL => {
								// En la variable downloadURL se tiene la dirección de descarga de la imagen
								console.log("downloadURL:" + downloadURL);
								// Mostrar el mensaje de finalización de la subida
								toast.present();
								// Ocultar mensaje de espera
								loading.dismiss();
								})
							})
						}
					},
					(err) => {
						console.log(err)
					}
					);
				}
				}, (err) => {
				console.log(err);
				});
		}
			async deleteFile(fileURL) {
			const toast = await this.toastController.create({
				message: 'File was deleted successfully',
				duration: 3000
			});
			this.firestoreService.deleteFileFromURL(fileURL)
				.then(() => {
				toast.present();
				}, (err) => {
				console.log(err);
				});
			}  

			compilemsg():string{
				

				var msg = "Vas a compartir la información de" + this.document.data.nombre + "de fórmula 1";

				return msg;
			}
			
			facebookShare(){
				var msg  = this.compilemsg();
				this.socialSharing.shareViaFacebook(msg, null, null);
			}

			regularShare(){
		
				let msg = this.compilemsg();
				// console.log(msg);
		
				this.socialSharing.share(msg, null, null, null);
			}
		
			twitterShare(){
				
				let msg = this.compilemsg();
				// console.log(msg);
		
				this.socialSharing.shareViaTwitter(msg, null, null);
			}
		
			whatsappShare(){
				
				let msg = this.compilemsg();
				// console.log(msg);
		
				this.socialSharing.shareViaWhatsApp(msg, null, null);
			}
}