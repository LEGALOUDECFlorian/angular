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
  // getUsers() {
  //   const url = `${this.apiBaseUrl}${this.apiUser}`;
  //   return this.http.get<User>(url);
  // }   

  getUsers(): Observable<User[]> { // Retourner un Observable<User[]>
    const url = `${this.apiBaseUrl}${this.apiUser}`;
    return this.http.get<User[]>(url); // Préciser le type de retour comme User[]
  }

  createNewUser(userForm: User): Observable<any> {
    const url = `${this.apiBaseUrl}${this.apiUser}`;
    return this.http.post<User>(url, userForm)
      .pipe(
        catchError((error) => {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user'); // Handle error appropriately
        })
      );
  }

  updateRecip(description: any): Observable<any> {
    const url = `${this.apiBaseUrl}${this.apiRecipe}`;
    console.log('Sending update request to:', url);
    return this.http.patch<any>(url, description) // Change the type of response from 'string' to 'any'
    .pipe(
      tap(response => {
        console.log('Update response:',{ response});
        const updatedRecipe = response.description; // Assuming response.data contains the updated recipe
        console.log('Updated recipe:', updatedRecipe);
        // Update your data model with updatedRecipe
      }),
      catchError(error => {
        console.error('Update error:', error);
        throw new Error (error);
      })
    );
      // catchError((error) => {
      //   console.error('Error update description:', error);
      //     throw new Error('Don\'t update description'); // Handle error appropriately
      // })
    //)
  }

}
