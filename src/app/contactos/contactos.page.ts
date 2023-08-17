import { Component, OnInit, ViewChild } from '@angular/core';
import { Contactos } from 'src/app/interface/contactos.interface';
import { userService } from '../services/user.service';
import { IonModal } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  contactos : Contactos[] =[]
  contacto : Contactos ={
    nombre :"",
    numero : "",
    nota : ""
  }

  constructor( private userService : userService , private toastr : ToastrService) { }

  ngOnInit() {
    this.contactos = this.userService.getContactos()!
  }

  agregarContacto(){
    this.userService.agregarContacto(this.contacto)
    this.toastr.success("Contacto Agregado Exitosamente","",{
      timeOut: 3000
    })
    this.contacto ={
      nombre :"",
    numero : "",
    nota : ""
    }
    this.cancel()
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }
}
