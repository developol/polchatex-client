import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../shared/service/authentication.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  private tokenCookieObservable: Observable<boolean>;
  username: string = "";
  password: string = "";

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private http: HttpClient) { }

  /*ngOnInit() {
    this.tokenCookieObservable = this.authenticationService.getTokenCookieObservable();
    this.confirmAuthentication();
  }

  login(username: string, password: string) {
    let properCredentials = {
      "username": username,
      "password": password
    };
    this.authenticationService.set_credentials(properCredentials);
    console.log(this.authenticationService.credentials);
    this.authenticationService.setCookie();
  }*/

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    this.http.post<Observable<boolean>>(environment.url + "/login", {
      username: this.username,
      password: this.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.username + ':' + this.password)
        );
        this.router.navigate(['chat']);
      } else {
        alert("Authentication failed.")
      }
    });
  }

  confirmAuthentication(): void {
    this.tokenCookieObservable.subscribe({
      next: cookie => {
        if (cookie) {
          setTimeout(() => this.router.navigate(['chat']), 1000);
        }
      }
    });
  }

}
