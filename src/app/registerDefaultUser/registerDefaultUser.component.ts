import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Cinsiyet } from '../models/cinsiyet';
import { DefaultUserAuthService } from '../services/default-user-auth.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-registerDefaultUser',
  templateUrl: './registerDefaultUser.component.html',
  styleUrls: ['./registerDefaultUser.component.css']
})
export class RegisterDefaultUserComponent implements OnInit {

  constructor(private authService: DefaultUserAuthService, private formBuilder: FormBuilder,private publicService:PublicService) { }

  registerUser: any = {};
  registerForm!: FormGroup;
  cinsiyet: Cinsiyet[] = [];

  ngOnInit() {
    this.createRegisterForm();
    this.getCinsiyet();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group(
      {
        firstName:["",Validators.required],
        lastName:["",Validators.required],
        email:['', [Validators.required,Validators.email]],
        confirmEmail:["",Validators.required],
        password:["",[Validators.required,Validators.minLength(8),Validators.maxLength(64),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]], 
        confirmPassword:["",Validators.required],
        phone:["",[Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('[0-9]*')]],
        cinsiyetId:["",Validators.required]
      },
      {validator:[this.passwordMatchValidator,this.emailMatchValidator]},
    )
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch:true}
  }
  emailMatchValidator(g:FormGroup){
    return g.get('email')?.value === g.get('confirmEmail')?.value ? null : {missmatch:true}
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({},this.registerForm.value)
      this.authService.register(this.registerUser);
    }
  }

  getCinsiyet(){
    this.publicService.getCinsiyet().subscribe(data => {
      this.cinsiyet = data;
    })
  }

}
