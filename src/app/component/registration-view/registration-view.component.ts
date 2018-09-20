import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.css']
})
export class RegistrationViewComponent implements OnInit {

  username: string = "";
  password: string = "";
  email: string = "";
  repeatPassword: string = "";

  messages: any = {
    successfullyRegistered: false,
    //possible validation errors
    fillOutAllFields: false,
    passwordsNotMatching: false,
    usernameTaken: false,
    passwordTooShort: false,
    terribleError: false
  }

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  //TODO: add live username feedback
  submit(): void {
    this.falsify();
    if (this.validate()) {
      return;
    }
    this.register();
  }

  sendRequest(): Observable<any> {
    let requestBody: any = {
      "username": this.username.trim(),
      "email": this.email,
      "password": this.password,
    }

    return this.http.post(environment.url + "/registration/add", requestBody, {observe: 'response'})
  }

  falsify(): void {
    for (var messageKey in this.messages) {
      this.messages[messageKey] = false;
    }
  }

  validate(): boolean {
    if (this.username === "" || this.email === "" || this.password === "" || this.repeatPassword === "") {
      return this.messages.fillOutAllFields = true;
    } else if (this.password != this.repeatPassword) {
      return this.messages.passwordsNotMatching = true;
    } else if (this.password.length < 8) {
      return this.messages.passwordTooShort = true;
    }
    return false;
  }

  register(): void {
    this.sendRequest().subscribe((response: Response) => {
      if (response.status === 200) {
        this.messages.successfullyRegistered = true;
      }
    }, err => {
      if (err.status === 400 || err.status === 500) {
        this.messages.terribleError = true;
        return;
      } else if (err.status === 409) {
        this.messages.usernameTaken = true;
        return;
      }
    });
  }
}
