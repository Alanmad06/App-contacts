import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interface/user.interface';
import { loginService } from 'src/app/services/login.service';
import { userService } from 'src/app/services/user.service';
import { PhotoService } from '../services/photo.service';
import { loginFirebaseService } from '../services/loginFirebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  private readonly emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  email: string ="";
  password : string ="";
  cpassword:string ="";
  


  
  

  constructor(
    private userService: userService,
    private loginService: loginService,
    private toast: ToastrService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private loginFirebase : loginFirebaseService
  ) {}

  ngOnInit() {}

  enviar(){
    if (this.password == this.cpassword && this.comprobar()) {
      
      
    
        this.loginService.setRegister(this.email, this.password).then(user =>{
          console.log("User Register :",user)
          this.router.navigate(['/']);
        }).catch(e=>{
          console.log("Error User Register", e)
        })
        
       
      

     
     
    } else if (this.password != this.cpassword) {
      this.toast.error('Contraseñas no Coinciden', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    } else {
      this.toast.error('Favor de rellenar todos los campos', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  comprobar() {
    return this.emailPattern.test(this.email)
  }

  
  logInWithGoogle(){
    this.loginFirebase.signInWithGoogle().then(res =>{
      console.log("Response Google" , res)
      this.router.navigate(['/'])
      
    }).catch(e =>{
      console.log("Error Response Google", e)
    }).finally(()=>{
      this.router.navigate(['/'])
    })
    
  }
  
}
