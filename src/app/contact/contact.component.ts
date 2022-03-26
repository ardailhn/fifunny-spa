import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private publicService:PublicService) { }

  registerUser: any = {};
  registerForm!: FormGroup;

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group(
      {
        firstName:["",Validators.required],
        lastName:["",Validators.required],
        email:['', [Validators.required,Validators.email]],
        phone:["",[Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('[0-9]*')]],
        text:["",Validators.required]
      },
    )
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({},this.registerForm.value)
      this.publicService.sendMessage(this.registerUser);
    }
  }

}
