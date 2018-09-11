import { Component } from '@angular/core';
import {WebSocketService} from "./shared/service/web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Polchatex';

  constructor(private webSocketService: WebSocketService) {}
}
