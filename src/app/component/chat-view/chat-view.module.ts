import { NgModule } from '@angular/core';
import {ChatlistComponent} from "./chatlist/chatlist.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {ChatComponent} from "./chat/chat.component";
import {InputComponent} from "./input/input.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { ChatViewComponent } from './chat-view.component';
import {AppRoutingModule} from "../../routing/app-routing.module";

@NgModule({
  declarations: [
    ChatlistComponent,
    NavbarComponent,
    ChatComponent,
    InputComponent,
    ChatViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    ChatlistComponent,
    NavbarComponent,
    ChatComponent,
    InputComponent
  ],
  providers: [
    CookieService
  ]
})
export class ChatViewModule {}
