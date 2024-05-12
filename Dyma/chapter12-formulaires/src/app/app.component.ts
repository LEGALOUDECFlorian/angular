import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  public form!: FormGroup;

  public cities = [
  {label: 'Paris', value: 'paris'},
  {label: 'Nice', value: 'nice'}
  ]
  

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      hobbies: this.fb.array([]),
      password: [''],
      nom: [''],
      gender: [''],
      city: [''],
      majeur: ['']
    })

    // this.form = new FormGroup({
    //     nom: new FormControl(''),
    //     hobbies: new FormArray([]),
    //     email: new FormControl(''),
    //     password: new FormControl('')
    //   });
    console.log(this.form)
  }

  public addHobbies(){
    this.hobbies.push(new FormControl(''));
  }
  
  public submit(): void {
    console.log( this.form);
  }
}


