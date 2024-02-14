import { Injectable } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { Contactos } from '../interface/contactos.interface';
import { usuariosFirebaseService } from './usuariosFirebase.service';
import { loginFirebaseService } from './loginFirebase.service';

@Injectable()
export class userService {
  user: User = {
    email: '',
    contactos: [],
  };

  constructor(){
  
   
  }


  setUser(user : User){
    this.user = user
  }

  setUserEmail(email: string) {
    this.user.email = email;
  }

  getUser() {
    return this.user;
  }

  getContactos() {
    return this.user.contactos;
  }

  agregarContacto(contacto: Contactos) {
    this.user.contactos?.push(contacto);
    console.log(this.user.contactos);
  }

  getContactobyIndex(i: number) {
    return this.user.contactos![i];
  }

  actualizarContacto(contacto: Contactos, i: number) {
    this.user.contactos![i] = contacto;
  }

  deleteContacto(i: number) {
    console.log('Delete ', this.user.contactos![i]);
    this.user.contactos?.splice(i, 1);
    console.log('Contacto borrado ', this.user.contactos);
  }
}
