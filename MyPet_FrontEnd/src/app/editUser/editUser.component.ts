import { animate, state, style, transition, trigger } from "@angular/animations";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-editUser',
    templateUrl: './editUser.component.html',
    styleUrls: ['./editUser.component.css'],
    animations: [
      trigger('enterState', [
        state('void', style({
          opacity: 0
        })),
        transition(':enter', [
          animate(400, style({
            opacity: 1
          }))
        ])
      ])
    ]
})

export class EditUserComponent implements OnInit {

    idUser: String;
    frmEditUser: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {

        this.route.params.subscribe(params => {
            this.idUser=params['id'];
        })

        this.frmEditUser = this.formBuilder.group({
            id: [`${this.idUser}`, Validators.nullValidator],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            Name: ['', Validators.required],
            role: ['user', Validators.nullValidator]
        });
    }

    onSubmit() {
            const url = `http://localhost:3000/api/users/${this.idUser}`;
            const jsonData = this.frmEditUser.value;

            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json'
                })
              };
          
              this.http.patch(url, jsonData, httpOptions)
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
}
