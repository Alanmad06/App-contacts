import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginFirebaseService } from '../services/loginFirebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

 

  constructor(private router : Router , private loginFirebase : loginFirebaseService) { 

   

  }

  ngOnInit() {
    
  }

  navigate(){
    this.router.navigate(["/configuracion"])
    console.log("navegar")
  }

  toggle(event:any){

    const checked = event.detail.checked
    document.body.classList.toggle('dark', checked);

  }

  logOut(){
this.loginFirebase.logOut()
this.router.navigate(["/login"])
  }

}
