import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contactos } from 'src/app/interface/contactos.interface';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  contacto : Contactos
  id : number

  constructor(private route : ActivatedRoute , private userService : userService) { 
    this.id=this.route.snapshot.params[('id')]
  }

  ngOnInit() {
    this.contacto = this.userService.getContactobyIndex(this.id)
  }

  save(){
    this.userService.actualizarContacto(this.contacto,this.id)
  }
}
