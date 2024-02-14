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

  saveUbication : boolean = true;

  constructor(private userService : userService , public photoService: PhotoService,
    private toastr : ToastrService) { 
    
  }

  ngOnInit() {
  
  }

  actualizar(){


  }
  

}
