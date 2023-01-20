import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService){

  }

  public getToken(): string {
    return (this.storage.getUser() as any).authToken;
  }

  login(user_name: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiHost + '/users/sign_in',
      {
        user_name,
        password,
      }
    );
  }

  signup(first_name: string, last_name: string, user_name: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiHost + '/users/sign_up',
      {
        first_name,
        last_name,
        user_name,
        password,
      }
    );
  }

  signout(): void {
    this.storage.clean()
  }

}
