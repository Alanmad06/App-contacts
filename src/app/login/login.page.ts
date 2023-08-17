import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { loginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string
  password : string 

  constructor(private loginService : loginService ,private loadingCtrl: LoadingController , private router : Router,
    private toastr : ToastrService) { }

  ngOnInit() {
  }

  enviar(){

    this.loginService.login(this.email,this.password).then(async x=>{

   
       
        this.loginService.changeLogged()
        this.router.navigate(['/'])
        
      



    }).catch(e =>{

      this.toastr.error(e, "Error",{
        timeOut:3000
      })
      
    })

  }

}
