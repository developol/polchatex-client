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
  private readonly authenticatedSubject: Subject<boolean>;
  private _authenticated: boolean = false;

  constructor(private http: HttpClient) {
    this.authenticatedSubject = new Subject<boolean>();
  }


  basicAuthentication(): Observable<string> {
    return this.http.get(environment.url + environment.tokenAutorizationEndpoint, {headers: this.b64Header, responseType: "text",
      withCredentials: true});
  }

  authenticate(): void {
    this.b64Header = new HttpHeaders({
      authorization : 'Basic ' + btoa(this._credentials.username + ':' + this._credentials.password)
    });
    this.basicAuthentication().subscribe((token: string) => {
      this.jwtToken = token;
      this.setAuthenticatedSubject(true);
      this._authenticated = true;
    }, () => alert("NIE ZNASZ HASLA :<"));
  }

  getAuthenticatedObservable(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }
  setAuthenticatedSubject(token: boolean): void {
    this.authenticatedSubject.next(token);
  }



  get credentials(): any {
    return this._credentials;
  }

  set_credentials(value: any) {
    this._credentials = value;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

}
