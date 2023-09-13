import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../shareds/models/user.model';
import { UserRequestLogin, UserResponseLogin } from '../../shareds/interfaces/userLogin.interface';
const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    private apiUrl = environment.baseUrl;
    private tokenSubject: BehaviorSubject<string | null>;

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('authToken'));
    }

    get authToken(): Observable<string | null> {
        return this.tokenSubject.asObservable();
      }

      hasToken() {
        return !!this.getToken();
      }

      getToken() {
        return window.localStorage.getItem(KEY)
      }

    cadastrarUsuario(usuario: User): Observable<any> {
      return this.http.post(`${this.apiUrl}users`, usuario);
    }

    login(userLogin: UserRequestLogin): Observable<UserResponseLogin> {
        return this.http.post(`${this.apiUrl}sessions`, userLogin)
                .pipe(
                    map(
                        (response : UserResponseLogin ) => {
                            const token = response.token;
                            if (token) {
                                localStorage.setItem(KEY, token); // Armazene o token no localStorage
                                this.tokenSubject.next(token); // Atualize o BehaviorSubject
                              }
                              return response;
                          }
                    )
                )
    }

    logout(): void {
        localStorage.removeItem('authToken'); // Remova o token do localStorage
        this.tokenSubject.next(null); // Atualize o BehaviorSubject para null
      }


}
