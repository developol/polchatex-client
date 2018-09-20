import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../shared/service/authentication.service";
import {ChatService} from "../../../shared/service/chat.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchedUser: string = '';

  constructor(private authenticationService: AuthenticationService,
              private chatService: ChatService) { }

  ngOnInit() {
  }

  onStartNewChatClicked() {
    this.chatService.addNewChat(this.searchedUser);
  }

  onLogoutClicked(): void {
    this.authenticationService.deleteToken();
  }
}
