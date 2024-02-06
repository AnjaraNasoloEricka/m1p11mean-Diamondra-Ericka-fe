import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "src/app/services/auth/user-auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register-message.component.html",
})
export class RegisterMessageComponent implements OnInit {
    constructor(private userAuthService : UserAuthService) {}

    message : string | undefined;

    ngOnInit(): void {
      this.message = this.userAuthService.message;
    }
}