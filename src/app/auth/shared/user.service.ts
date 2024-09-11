import {inject, Injectable} from '@angular/core';
import {LoginUser, ResetPasswordDto, User} from "./user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http:HttpClient = inject(HttpClient);
  private baseUrl:string = `${environment.apiUrl}`;


  registerUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl+'/register',user);
  }
  loginUser(user:LoginUser) {
    console.log(user);
    return this.http.post(this.baseUrl+'/login',user, {responseType: "text"});
      // .pipe(
      // catchError(this.handleError)
    // );
  }
  logoutUser(){
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  // decodeToken(token: string): any {
  //   if (token) {
  //     return jwtDecode(token);
  //   }
  // }
  forgotPasswordRequest(email:string):Observable<any>{
    const resetUrl = `${this.baseUrl}/forgot-password/${email}`;
    return this.http.post<any>(resetUrl,{}).pipe(
      catchError(this.handleError)
    )
  }

  resetPassword(resetRequest: ResetPasswordDto):Observable<any>{
    const resetUrl = `${this.baseUrl}/reset-password`;
    return this.http.put<any>(resetUrl,resetRequest).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      window.alert(error.error.title);
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
