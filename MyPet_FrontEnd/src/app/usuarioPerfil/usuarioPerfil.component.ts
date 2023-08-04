import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-usuarioPerfil',
    templateUrl: './usuarioPerfil.component.html',
    styleUrls: ['./usuarioPerfil.component.css']
})

export class UsuarioPerfilComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  usuario:any;
  idUser:string;
  mascotas: any[];

  ngOnInit(): void {
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

}
