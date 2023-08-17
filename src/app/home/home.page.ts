import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { userService } from '../services/user.service';
import { UserPhoto } from '../interface/photo.interface';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user : User 
  


  constructor(private userService : userService , public photoService : PhotoService) {
    
  }

  ngOnInit(): void {
  this.user = this.userService.getUser()

  
  }

  getNumeroContactos(){
    return this.userService.getContactos()?.length
  }


  

}
