import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SwitchService } from "../services/switch.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-usuarioPerfil',
    templateUrl: './usuarioPerfil.component.html',
    styleUrls: ['./usuarioPerfil.component.css'],
    animations: [
      trigger('enterState', [
        state('void', style({
          opacity: 0
        })),
        transition(':enter', [
          animate(700, style({
            opacity: 1
          }))
        ])
      ])
    ]
})

export class UsuarioPerfilComponent implements OnInit {

  modalSwitch: boolean;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private modalSS: SwitchService) { }

  usuario:any;
  idUser:string;
  mascotas: any[];

  ngOnInit(): void {

    this.modalSS.$modalEliminarUser.subscribe((valor) => this.modalSwitch = valor);

    this.route.params.subscribe(params => {
      this.idUser=params['id'];
    })

    this.consultarContacto(this.idUser);
    this.consultarMascotas();
  }

  consultarContacto(idUser: string) {
    const url = `http://localhost:3000/api/users/${idUser}`;
    this.http.get(url).subscribe  (data => {
      this.usuario = data;

      console.log(this.usuario);
    })
  }

  consultarMascotas() {

    this.http.get<any[]>(`http://localhost:3000/users/${this.idUser}/pets`)
    .subscribe (
        data => {
            this.mascotas = data;
        }
    )
  }

  openModal() {
    this.modalSwitch = true;
  }

}
