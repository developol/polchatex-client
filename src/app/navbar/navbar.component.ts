import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  login(loginCredentials: String) {
    var credentials = loginCredentials.split(" ");
    var properCredentials = {
      "username": credentials[0],
      "password": credentials[1]
    }
    this.authenticationService.set_credentials(properCredentials)
    console.log(this.authenticationService.credentials);
    this.authenticationService.setCookie();
  }
}
