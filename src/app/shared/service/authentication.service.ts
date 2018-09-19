import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _credentials: any;
  private b64Header: HttpHeaders;
  private jwtToken: string;
  private readonly tokenSubject: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new Subject<boolean>();
  }


  basicAuthentication(): Observable<string> {
    return this.http.get(environment.url + environment.tokenAutorizationEndpoint,
      {headers: this.b64Header, responseType: "text",
      withCredentials: true});
  }

  setToken(): void {
    this.b64Header = new HttpHeaders({
      authorization : 'Basic ' + btoa(this._credentials.username + ':' + this._credentials.password)
    });
    this.basicAuthentication().subscribe((token: string) => {
      this.jwtToken = token;
      console.log(this.jwtToken);
      sessionStorage.setItem("JSESSIONID", this.jwtToken);
      sessionStorage.setItem("USERNAME", this._credentials.username);
      this.setTokenObservable(this.checkIfTokenExists());
    });
  }

  deleteToken(): void {
    sessionStorage.removeItem("JSESSIONID");
    sessionStorage.removeItem("USERNAME");
  }

  checkIfTokenExists(): boolean  {
    let jsessionid = sessionStorage.getItem("JSESSIONID");
    return jsessionid != null;
  }

  checkIfCookieIsValidObservable(): Observable<boolean> {
    let validSubject: Subject<boolean> = new Subject();
    if (this.checkIfTokenExists()) {
      this.http.get(environment.url + environment.chatListEndpoint,
        {withCredentials: true})
        .subscribe((response) => validSubject.next(true),
            (error) => validSubject.next(false));
    } else {
      validSubject.next(false);
    }
    return validSubject.asObservable();
  }

  getTokenObservable(): Observable<boolean> {
    return this.tokenSubject.asObservable();
  }
  setTokenObservable(token: boolean): void {
    this.tokenSubject.next(token);
  }



  get credentials(): any {
    return this._credentials;
  }

  set_credentials(value: any) {
    this._credentials = value;
  }

}
