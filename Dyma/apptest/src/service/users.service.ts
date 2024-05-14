import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { User } from 'src/app/models/User';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiBaseUrl: string;
  private apiUser: string;
  private apiRecipe: string;

  constructor(
    private http : HttpClient,
    private appConfig : AppConfigService) {
      this.apiBaseUrl = this.appConfig.apiBaseUrl;
      this.apiUser = this.appConfig.apiUser;
      this.apiRecipe = this.appConfig.apiRecipe;
     }

  getUserDetails(userId: number) {
    
    const url = `${this.apiBaseUrl}${this.apiUser}/${userId}`;
    return this.http.get<User>(url);
  }   

  getUsers(): Observable<User[]> { // Retourne un Observable<User[]>
    const url = `${this.apiBaseUrl}${this.apiUser}`;
    return this.http.get<User[]>(url); // Précise le type de retour comme User[]
  }

  createNewUser(userForm: User): Observable<any> {
    const url = `${this.apiBaseUrl}${this.apiUser}`;
    return this.http.post<User>(url, userForm)
      .pipe(
        catchError((error) => {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user'); 
        })
      );
  }

  updateRecip(description: any): Observable<any> {
    const url = `${this.apiBaseUrl}${this.apiRecipe}`;
    console.log('Sending update request to:', url);
    return this.http.patch<any>(url, description) 
    .pipe(
      tap(response => {
        console.log('Update response:',{ response});
        const updatedRecipe = response.description; 
        console.log('Updated recipe:', updatedRecipe);
      }),
      catchError(error => {
        console.error('Update error:', error);
        throw new Error (error);
      })
    );
  }
}
