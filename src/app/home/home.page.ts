import { Component, OnDestroy, OnInit, destroyPlatform } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { userService } from '../services/user.service';

import { PhotoService } from '../services/photo.service';
import { Share } from '@capacitor/share';
import { usuariosFirebaseService } from '../services/usuariosFirebase.service';
import { destroyView } from '@ionic/angular/directives/navigation/stack-utils';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { loginFirebaseService } from '../services/loginFirebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: User = {
    email: '',
  };
  nombre: string;
  reg = new RegExp(/^.*(?=@)/);
  private userSubscription: Subscription;

  constructor(
    private userService: userService,
    public photoService: PhotoService,
    private usuariosFirebase: usuariosFirebaseService,
    private navCtrl: NavController,
    private lo: loginFirebaseService
  ) {
    this.userSubscription = this.usuariosFirebase
      .getUsuarios()
      .subscribe((user) => {
        console.log('User Home :', user);
        if (user) {
          this.user = user[0];
          this.userService.setUser(this.user);
          this.nombre = this.reg.exec(this.user.email)?.[0]!;
        }
      });
  }
 

  

  

 
  
  getNumeroContactos() {
    return this.userService.getContactos()?.length;
  }

  async sharePhoto() {
    this.photoService.addProfile();
  }
}
