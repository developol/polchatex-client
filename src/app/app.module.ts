import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ChatViewModule} from "./component/chat-view/chat-view.module";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./routing/app-routing.module";
import {LoginViewComponent} from "./component/login-view/login-view.component";
import { RegistrationViewComponent } from './component/registration-view/registration-view.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    RegistrationViewComponent
  ],
  imports: [
    ChatViewModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
