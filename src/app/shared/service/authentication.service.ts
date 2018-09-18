import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _credentials: any;
  private b64Header: HttpHeaders;
  private jwtToken: string;
  private readonly tokenCookie: Subject<boolean>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.tokenCookie = new Subject<boolean>();
  }


  basicAuthentication(): Observable<string> {
    return this.http.get(environment.url + environment.tokenAutorizationEndpoint, {headers: this.b64Header, responseType: "text",
      withCredentials: true});
  }

  setCookie(): void {
    this.b64Header = new HttpHeaders({
      authorization : 'Basic ' + btoa(this._credentials.username + ':' + this._credentials.password)
    });
    this.basicAuthentication().subscribe((token: string) => {
      this.jwtToken = token;
      console.log(this.jwtToken);
      this.cookieService.set("JSESSIONID", this.jwtToken);
      this.setTokenCookie(this.checkIfCookieExists());
      this.http.get(environment.url + "/rest/getchatlist").subscribe(response => {
        console.log(response);
      })
    });
  }

  checkIfCookieExists():boolean  {
    return this.cookieService.check('JSESSIONID')
  }

  getTokenCookieObservable(): Observable<boolean> {
    return this.tokenCookie.asObservable();
  }
  setTokenCookie(token: boolean): void {
    this.tokenCookie.next(token);
  }



  get credentials(): any {
    return this._credentials;
  }

  set_credentials(value: any) {
    this._credentials = value;
  }

}
