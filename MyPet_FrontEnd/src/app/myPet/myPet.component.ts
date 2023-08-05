import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { SwitchService } from "../services/switch.service";

@Component({
    selector: 'app-myPet',
    templateUrl: './myPet.component.html',
    styleUrls: ['./myPet.component.css']
})

export class MyPetComponent implements OnInit {
    
    frmEditPet: FormGroup;
    idUser: String;
    idPet: String;
    modalSwitch: boolean;
    pet: any;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private modalSS: SwitchService) {}

    ngOnInit() {
        this.initForm();

        this.getPetData();
    }

    initForm() {

      this.modalSS.$modalEliminarPet.subscribe((valor) => this.modalSwitch = valor);

        this.route.params.subscribe(params => {
            this.idUser=params['id'];
            this.idPet=params['pet'];
          });

          this.frmEditPet = this.formBuilder.group({
            id: [`${this.idPet}`, Validators.nullValidator],
            namePet: ['', [Validators.required]],
            raza: ['', [Validators.required]],
            state: ['', Validators.required],
            description: ['', Validators.nullValidator],
            userId: [`${this.idUser}`, Validators.nullValidator]
          });
    }

    getPetData() {
      const url = `http://localhost:3000/api/pets/${this.idPet}`;

      this.http.get(url).subscribe (dataPet => {
          this.pet = dataPet;
        })
    }

    onSubmit() {
        const url = `http://localhost:3000/api/pets/${this.idPet}`;
        const jsonData = this.frmEditPet.value;

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

    openModal() {
      this.modalSwitch = true;
    }

  }