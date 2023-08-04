import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-addPet',
    templateUrl: './addPet.component.html',
    styleUrls: ['./addPet.component.css']
})

export class AddPetComponent implements OnInit{

    frmAddPet: FormGroup;
    idUser: String;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {}

    ngOnInit() {
        this.initForm();

        
    }

    initForm() {

        this.route.params.subscribe(params => {
            this.idUser=params['id'];
            console.log(this.idUser)
          })
        this.frmAddPet = this.formBuilder.group({
          namePet: ['', [Validators.required, Validators.email]],
          raza: ['', [Validators.required]],
          state: ['', Validators.required],
          description: ['', Validators.nullValidator],
          userId: [`${this.idUser}`, Validators.nullValidator]
        });
    }

    onSubmit() {
        const url = 'http://localhost:3000/pets';
        const jsonData = this.frmAddPet.value;

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

                location.href=`http://localhost:4200/user_profile/${this.idUser}`
              },
              (error) => {
                // Manejar errores
                console.error('Error al enviar el formulario:', error);
              }
            );
    }
}