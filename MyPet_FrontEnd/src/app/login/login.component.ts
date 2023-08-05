import { animate, state, style, transition, trigger } from "@angular/animations";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
      trigger('enterState', [
        state('void', style({
          opacity: 0
        })),
        transition(':enter', [
          animate(500, style({
            opacity: 1
          }))
        ])
      ])
    ]
})

export class LoginComponent implements OnInit {
     
  formulario: FormGroup ;
  datos: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    //FORMULARIO REACTIVO

    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });


  }

  onSubmit() {
    if (this.formulario.valid) {
      const url = 'http://localhost:3000/login'; 
      const jsonData = this.formulario.value;
  
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      };
  
      this.http.post<any[]>(url, jsonData, httpOptions)
        .subscribe(
          (data) => {
            // Manejar la respuesta de la API
            console.log('Respuesta de la API:', data);
            this.datos = JSON.stringify(data);


            location.href=`http://localhost:4200/user_profile/${this.datos.substring(9, this.datos.length-2)}`
          },
          (error) => {
            // Manejar errores
            console.error('Error al enviar el formulario:', error);
            alert(error.error.error.message)
          }
        );
    }
  }
}