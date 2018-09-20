import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ChatViewComponent} from "../component/chat-view/chat-view.component";
import {LoginViewComponent} from "../component/login-view/login-view.component";
import {RoutingGuard} from "./routing-guard";
import {RegistrationViewComponent} from '../component/registration-view/registration-view.component';

const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'register', component: RegistrationViewComponent},
  {path: 'chat', component: ChatViewComponent, canActivate: [RoutingGuard]},
  {path: '**', component: LoginViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: [
    RoutingGuard
  ]
})
export class AppRoutingModule { }
