import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar-pet',
  templateUrl: './eliminar-pet.component.html',
  styleUrls: ['./eliminar-pet.component.css']
})
export class EliminarPetComponent {
  modalSwitch: boolean;
  idPet: String;
  idUser: String;

  constructor(private http: HttpClient, private modalSS: SwitchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPet=params['pet'];
      this.idUser=params['id'];
    })
  }

  onSubmit() {
    const url = `http://localhost:3000/api/pets/${this.idPet}`;

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      this.http.delete(url)
        .subscribe(
          (data) => {
            // Manejar la respuesta de la API
            console.log('Respuesta de la API:', data);

            location.href=`http://localhost:4200/user_profile/${this.idUser}`
          },
          (error) => {
            // Manejar errores
            console.error('Error al enviar el formulario:', error);
          }
        );

}

  cerrarModal() {
    this.modalSS.$modalEliminarPet.emit(false);
  }
}
