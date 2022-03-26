import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registerUser',
  templateUrl: './registerUser.component.html',
  styleUrls: ['./registerUser.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

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
        confirmEmail:["",Validators.required],
        password:["",[Validators.required,Validators.minLength(8),Validators.maxLength(64),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]], 
        confirmPassword:["",Validators.required],
        phone:["",[Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('[0-9]*')]],
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

}
