import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "src/app/services/auth/user-auth.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register-message.component.html",
})
export class RegisterMessageComponent implements OnInit {
    constructor(private userAuthService : UserAuthService, private route : ActivatedRoute) {}

    message : string | undefined;
    error : string | undefined;
    isLoading : boolean = false;

    ngOnInit(): void {
      this.isLoading = true;
      try {
        this.route.params.subscribe(params => {
          if(params.token) {
            this.userAuthService.confirmRegister(params.token).then((response) => {
              console.log(response.message);
              if(response.status === 200){
                  this.message = response.message;
              }
              else{
                  this.error = response.message;
              }
            }).catch((error) => {
              this.error = error.error.message;
            });
          }
        });
        this.message = this.userAuthService.message;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }        
  }
}