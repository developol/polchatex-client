import {Injectable} from "@angular/core";
import {AuthenticationService} from "../shared/service/authentication.service";
import {CanActivate} from "@angular/router";

@Injectable()
export class RoutingGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate(): boolean {
    return this.authenticationService.checkIfCookieExists();
  }
}
