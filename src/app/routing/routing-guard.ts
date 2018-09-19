import {Injectable} from "@angular/core";
import {AuthenticationService} from "../shared/service/authentication.service";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class RoutingGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate(): boolean {
    let tokenExists = this.authenticationService.checkIfTokenExists();
    if (tokenExists) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
