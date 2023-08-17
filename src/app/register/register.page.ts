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
  password: string;
  cpassword: string;
  nombre: string;
  apellido: string;
  email: string;
  sexo: string;

  hobbies: any = {
    Musica: false,
    Programar: false,
    Deportes: false,
    Leer: false,
    Cocinar: false,
    Videojuegos: false,
    Otros: false,
  };

  birthday = format(new Date(), 'yyyy-MM-dd');
  birthString: string;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '!',
      message: 'Estas seguro de regstrarte sin hobbies?',
      buttons : this.alertButtons
      
    });

    await alert.present();
  }

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
        this.userService.setUser(
          this.nombre,
          this.apellido,
          this.email,
          this.setHobbies(),
          this.sexo,
          this.birthString
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
      console.log(this.sexo);
      
      if (this.setHobbies().length == 0) {
        this.presentAlert()
      } else if(this.setHobbies().length>=1){
        this.loginService.setRegister(this.email, this.password);
        this.userService.setUser(
          this.nombre,
          this.apellido,
          this.email,
          this.setHobbies(),
          this.sexo,
          this.birthString
        );
        this.router.navigate(['/login']);
      }

     
     
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
    const valores = [
      this.password,
      this.cpassword,
      this.nombre,
      this.apellido,
      this.email,
      this.sexo,
    ];
    return valores.every((valor) => valor !== null && valor !== undefined);
  }

  setHobbies() {
    const hobbies = Object.keys(this.hobbies).filter(
      (key) => this.hobbies[key]
    );
    return hobbies;
  }

  change(value: any) {
    this.birthString = format(parseISO(value), 'yyyy-MM-dd');
  }
}
