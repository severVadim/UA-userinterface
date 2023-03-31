import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import {e, p} from "@angular/core/src/render3";

@Component({
    moduleId: module.id,
    templateUrl: 'confirmation.component.html'
})

export class ConfirmationComponent implements OnInit {
    token: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
           this.token = params['token']
        });
       this.userService.confirmUser(this.token).subscribe(
           data => {
               this.alertService.success("User account was verfiied")
           },
           error => {
               console.log(error)
               let message;
               if (error.status == 401){
                   message = "Token incorrect or expired"
               } else {
                   message = "Unexpected error"
               }
               this.alertService.error(message);
           });
    }
}
