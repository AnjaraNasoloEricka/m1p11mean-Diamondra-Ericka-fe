import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {

  formBuiled = new FormBuilder();
  signUpForm: FormGroup = new FormGroup({
    name: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
    email: this.formBuiled.control("", [Validators.required, Validators.email, Validators.minLength(1)]),
    password: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
    phoneNumber: this.formBuiled.control("", [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]*$")]),
  });
  error : string | undefined;

  constructor(private userAuthService : UserAuthService, private router: Router) {}

  /* check if form values are valid and return error if not*/
  checkFormValidity(){
    if(this.signUpForm.invalid){
      if ((this.signUpForm.controls.phoneNumber.errors) || (this.signUpForm.controls.phoneNumber.errors?.minlength)) {
        this.error = "Invalid phone number format";
      }
      if ((this.signUpForm.controls.phoneNumber.errors?.required) ) {
        this.error = "Phone number is required";
      }
      if ((this.signUpForm.controls.password.errors?.required) || (this.signUpForm.controls.password.errors?.minlength)) {
        this.error = "Password is required";
      }
      if (this.signUpForm.controls.email.errors?.email) {
        this.error = "Invalid email format";
      }
      if ((this.signUpForm.controls.email.errors?.required) || (this.signUpForm.controls.password.errors?.minlength)) {
        this.error = "Email is required";
      }      
      if ((this.signUpForm.controls.name.errors?.required) || (this.signUpForm.controls.name.errors?.minlength)) {
        this.error = "Name is required";
      }
      return;
    }
    this.handleSignUp();
  }
  /* check if form values are valid */

  handleSignUp(){
    this.userAuthService.signUp(this.signUpForm.value).then((response) => {
      if(response.status === 200){
        this.userAuthService.message = response.message;
        console.log(response.message);
        //send to register success page with response.message
        this.router.navigate(["auth/register-success"]);

      }
      else{
        this.error = response.message;
      }
    })
    .catch((error) => {
      this.error = error.error.message;
    });
  }

  ngOnInit(): void {}
}
