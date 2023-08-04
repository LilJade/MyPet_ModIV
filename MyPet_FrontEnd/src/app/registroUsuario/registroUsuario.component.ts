import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-registroUsuario',
    templateUrl: './registroUsuario.component.html',
    styleUrls: ['./registroUsuario.component.css']
})

export class RegistroUsuarioComponent implements OnInit {

    frmAddUser: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.frmAddUser = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          Name: ['', Validators.required],
          role: ['user', Validators.nullValidator]
        });
    }

    onSubmit() {
            const url = 'http://localhost:3000/createuser/api';
            const jsonData = this.frmAddUser.value;

            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json'
                })
              };
          
              this.http.post(url, jsonData, httpOptions)
                .subscribe(
                  (data) => {
                    // Manejar la respuesta de la API
                    console.log('Respuesta de la API:', data);

                    location.href=`http://localhost:4200/user_profile/${data}`
                  },
                  (error) => {
                    // Manejar errores
                    console.error('Error al enviar el formulario:', error);
                  }
                );
        
    }
}

