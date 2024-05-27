import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, map } from 'rxjs';
import { User } from 'src/app/models/User';
import { TestAllItems } from 'src/models/testAllItems';
import { UsersService } from 'src/service/users.service';
// import { AppConfigService } from 'src/service/app-config.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit {
 
  public form = this.fb.group({
    userForm: this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      username: [''],
    }),
    addComent: this.fb.group({
      description: [''],
    }),
})

  user!: User;
  users!: User[];
  allItems!: TestAllItems;
  AddNewComent: boolean = false;
  description: string = '';

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  toggleTextArea() {
    this.AddNewComent = true;
  }

  ngOnInit(): void {
    this.getUserDetails(1);
    this.getUsers();
    this.getAllItems();
  }

  getUserDetails(userId: number) {
    this.usersService
      .getUserDetails(userId)
      .subscribe((userData) => (this.user = userData));
  }
  getUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // getAllItems(): void {
  //   this.usersService.getAllItems().subscribe((allItems) => {
  //     this.allItems = allItems;
  //     console.log({allItems})
  //     //return allItems;
  //   });
  // }

  async getAllItems(): Promise<TestAllItems> {
    try {
      const allItems = await firstValueFrom( 
        this.usersService.getAllItems().pipe(
        
          map(id => ({ allUsers: id.allUsers, allRecipes: id.allRecipes })) 
        )
      ); 
      this.allItems = allItems;
      console.log({ allItems });
      return allItems;
    } catch (error) {
     
      console.error("Error fetching items:", error);
      throw error;
    }
  }
  
  // updateRecipe(): void {
  //   this.usersService.updateRecip(description).subscribe((newComent) => {
  //     this.newComent = description;
  //   })
  // }

  public onSubmit() {
    const userForm = this.form.get('userForm')?.value;
    const description = this.form.get('addComent')?.value;
    console.log(description);
    console.log(userForm);

    const newUser: User = {
      firstname: userForm!.firstname || '',
      lastname: userForm!.lastname || '',
      email: userForm!.email || '',
      password: userForm!.password || '',
      username: userForm!.username || '',
    };

    //const comment = {description: commentText?.description};
    
    console.log({description});

    this.usersService.createNewUser(newUser).subscribe((response: any) => {
      console.log(response);
     // window.location.reload(); // Actualise la page
    });

    if (description) {
      this.usersService.updateRecip(description).subscribe((response: any) => {
        console.log('update',{response});
      }

      )
    }

  }
}
