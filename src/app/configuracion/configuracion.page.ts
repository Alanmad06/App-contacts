import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user.interface';
import { userService } from '../services/user.service';
import { PhotoService } from '../services/photo.service';
import { UserPhoto } from '../interface/photo.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  user : User
  photo : UserPhoto
  Hobbies: any = {
    Musica: false,
    Programar: false,
    Deportes: false,
    Leer: false,
    Cocinar: false,
    Videojuegos: false,
    Otros: false
  }


  constructor(private userService : userService , public photoService: PhotoService,
    private toastr : ToastrService) { 
    
  }

  ngOnInit() {
    this.user = this.userService.getUser()
    Object.keys(this.Hobbies).forEach(key => {
      this.Hobbies[key] = this.user.hobbies?.includes(key);
    });
  }

  actualizar(){

    this.userService.setUser(this.user.nombre, this.user.apellido, this.user.email, this.setHobbies(),this.user.sexo ,this.user.birthday )

  }
  setHobbies(){
    const hobbies = Object.keys(this.Hobbies).filter(key => this.Hobbies[key]);
    return hobbies
  }
  

  change(value:any){

  }

  addPhoto(){
    this.photoService.addProfile().then(x=>{
      this.toastr.success("Imagen Añadida Correctamente")
    }).catch(e =>{
      this.toastr.error(e,"Error")
    })

  }

}
