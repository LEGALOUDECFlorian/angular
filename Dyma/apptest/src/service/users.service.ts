import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { User } from 'src/app/models/User';
import { Observable, catchError, forkJoin, map, tap, throwError } from 'rxjs';
import { TestAllItems } from 'src/app/models/testAllItems';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiBaseUrl: string;
  private apiUser: string;
  private apiRecipe: string;
  private apiRecipes: string;

  constructor(
    private http : HttpClient,
    private appConfig : AppConfigService) {
      this.apiBaseUrl = this.appConfig.apiBaseUrl;
      this.apiUser = this.appConfig.apiUser;
      this.apiRecipe = this.appConfig.apiRecipe;
      this.apiRecipes = this.appConfig.apiRecipes;
     }

   getAllItems(): Observable<TestAllItems> {
    const usersUrl =  `${this.apiBaseUrl}${this.apiUser}`;
    const recipesUrl = `${this.apiBaseUrl}${this.apiRecipes}`;
    console.log({recipesUrl})
    return forkJoin([
      this.http.get<any[]>(usersUrl).pipe(
        catchError(error => handleError(error))
      ),
      this.http.get<any[]>(recipesUrl).pipe(
        catchError(
          error => handleError(error)
        )
      )
    ]).pipe(
      map(([users, recipes]) => ({
        allUsers: users,
        allRecipes: recipes
      }))
    );
  }
    
    // // In your component or service
    // this.myService.getAllItems().subscribe(data => {
    //   // Use the data.allUsers and data.allRecipes here
    // });

  

  getUserDetails(userId: number) {
    
    const url = `${this.apiBaseUrl}${this.apiUser}/${userId}`;
    return this.http.get<User>(url);
  }   

  getUsers(): Observable<User[]> { 
    const url = `${this.apiBaseUrl}${this.apiUser}`;
    return this.http.get<User[]>(url); 
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

function handleError(error: any): any {
  throw new Error('Function not implemented.');
}

