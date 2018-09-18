import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../shared/service/authentication.service";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  private authenticatedObservable: Observable<boolean>;
  username: string = "";
  password: string = "";

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.authenticatedObservable = this.authenticationService.getAuthenticatedObservable();
    this.confirmAuthentication();
  }

  login(username: string, password: string) {
    let properCredentials = {
      "username": username,
      "password": password
    };
    this.authenticationService.set_credentials(properCredentials);
    console.log(this.authenticationService.credentials);
    this.authenticationService.authenticate();
  }

  confirmAuthentication(): void {
    this.authenticatedObservable.subscribe({
      next: authenticated => {
        if (authenticated) {
          setTimeout(() => this.router.navigate(['chat']), 1000);
        }
      }
    });
  }

}
