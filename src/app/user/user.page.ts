import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Pilotos } from '../pilotos';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  id = null;

  document: any = {
    id: "",
    data: {} as Pilotos
  };

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.firestoreService.consultarPorId("pilotos", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log(this.document.data.titulo);
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Pilotos;
      } 
    });
  }

}
