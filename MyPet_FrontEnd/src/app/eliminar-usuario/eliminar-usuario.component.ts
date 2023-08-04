import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  modalSwitch: boolean;
  idUser: String;

  constructor(private http: HttpClient, private modalSS: SwitchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUser=params['id'];
    })
  }

  onSubmit() {
    const url = `http://localhost:3000/api/users/${this.idUser}`;

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

            location.href=`http://localhost:4200/login`
          },
          (error) => {
            // Manejar errores
            console.error('Error al enviar el formulario:', error);
          }
        );

}

  cerrarModal() {
    this.modalSS.$modalEliminarUser.emit(false);
  }

}
