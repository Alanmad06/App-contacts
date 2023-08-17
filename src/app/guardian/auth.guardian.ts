import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { loginService } from "src/app/services/login.service";
@Injectable()
export class authGuard{

    constructor(private loginService:loginService, private router : Router){

    }

    canActivate(): Promise<boolean>{
        return new Promise((resolve, reject)=>{ 
            if(this.loginService.getIsLogged()){
                
                resolve(true)
                
            }else{
                this.router.navigate(['/register'])
                
                reject(false)
                
            }
           
   })
       
       
   }
}
