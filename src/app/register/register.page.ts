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
  


  
  
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        this.loginService.setRegister(this.email, this.password);
        this.userService.setUserEmail(

          this.email
          
         
        );
        this.router.navigate(['/login']);
      },
    },
  ];
  constructor(
    private userService: userService,
    private loginService: loginService,
    private toast: ToastrService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async enviar(): Promise<void> {
    if (this.password == this.cpassword && this.comprobar()) {
      
      
    
        this.loginService.setRegister(this.email, this.password);
        this.userService.setUserEmail(
         
          this.email
          
        );
        this.router.navigate(['/login']);
      

     
     
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

  

  
}
