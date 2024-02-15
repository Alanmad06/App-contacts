import { Component, OnInit } from '@angular/core';
import { loginFirebaseService } from '../services/loginFirebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string = ""
  private readonly emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private loginFirebase : loginFirebaseService) { }

  ngOnInit() {
  }

  enviar(){

    if(this.emailPattern.test(this.email)){

      this.loginFirebase.resetPasswordWithEmail(this.email).then(res=>{
        console.log("Response Reset Password", res)
      }).catch(e=>{
        console.log("Error Response Reset Password" ,e)
      })
    }

  }

}
