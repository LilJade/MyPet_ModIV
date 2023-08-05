import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    usuarios: any[];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.consultarUsuarios();
    }

    consultarUsuarios() {

        this.http.get<any[]>('http://localhost:3000/api/all')
        .subscribe (
            data => {
                this.usuarios = data;
            }
        )
    }
}

