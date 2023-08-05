import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-navBar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit {

    idUser: String;
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.idUser=params['id'];
          });
    }
}
