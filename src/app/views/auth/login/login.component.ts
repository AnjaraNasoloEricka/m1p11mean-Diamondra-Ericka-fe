import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { Router } from "@angular/router";
import { LogoutService } from "src/app/services/utils/logout.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  formBuiled = new FormBuilder();
  loginForm: FormGroup = new FormGroup({
    email: this.formBuiled.control("", [Validators.required, Validators.email, Validators.minLength(1)]),
    password: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
  });
  error : string | undefined;
  isLoading : boolean = false;

  constructor(private logoutService : LogoutService, private userAuthService : UserAuthService, private router: Router) {}

  /* check if form values are valid and return error if not*/
  checkFormValidity(){
    if(this.loginForm.invalid){
      if ((this.loginForm.controls.email.errors?.required) || (this.loginForm.controls.password.errors?.minlength)) {
        this.error = "Email is required";
      }
      if (this.loginForm.controls.email.errors?.email) {
        this.error = "Invalid email format";
      }
      if ((this.loginForm.controls.password.errors?.required) || (this.loginForm.controls.password.errors?.minlength)) {
        this.error = "Password is required";
      }
      return;
    }
    this.handleLogin();
  }
  /* check if form values are valid */

  handleLogin(){
    this.isLoading = true;
    this.userAuthService.signIn(this.loginForm.value).then((response) => {
      if(response.status === 200){
        localStorage.setItem("token", response.data.token);
        let user =response.data.user
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role.label === "Customer"){
          this.router.navigate(["/customer/home"]);
          return;
        } 
        if (user.role.label == "Employee"){
          this.router.navigate(["/employee/dashboard"]);
          return;
        } 
        this.router.navigate(["/admin/dashboard"]);
        return;
      }
      this.error = response.message;
    })
    .catch((error) => {
      this.error = error.error.message;
    })
    .finally(() => {
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.logoutService.logout();
  }

}
