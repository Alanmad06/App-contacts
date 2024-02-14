import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { userService } from '../services/user.service';

import { PhotoService } from '../services/photo.service';
import { Share } from '@capacitor/share';
import { usuariosFirebaseService } from '../services/usuariosFirebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user : User 
  nombre : string;
  reg = new RegExp(/^.*(?=@)/);


  constructor(private userService : userService , public photoService : PhotoService , private usuariosFirebase: usuariosFirebaseService) {
    this.usuariosFirebase.getUsuarios().subscribe(observable=>{
    console.log("sdww", observable)
    })
  }

  ngOnInit(): void {
  this.user = this.userService.getUser()
  
  this.nombre=this.reg.exec(this.user.email)?.[0]!
  
  }

  getNumeroContactos(){
    return this.userService.getContactos()?.length
  }

  async sharePhoto(){


      this.photoService.addProfile()
  }


  

}
