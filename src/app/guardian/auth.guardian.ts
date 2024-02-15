import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { loginService } from "src/app/services/login.service";
import { loginFirebaseService } from "../services/loginFirebase.service";
import { Auth, onAuthStateChanged } from "@angular/fire/auth";
@Injectable()
export class authGuard{


    private auth : Auth = inject(Auth)
    constructor(private loginService:loginService, private router : Router, private loginFirebase : loginFirebaseService){

    }

    canActivate(): Promise<boolean>{
       
           
        return new Promise((resolve, reject)=>{ onAuthStateChanged(this.auth, (user)=>{
            if(!user){
                this.router.navigate(['/login'])
                reject( false)

            }else{
                resolve( true)
            }
        })
         
    })
       
       
   }
}
