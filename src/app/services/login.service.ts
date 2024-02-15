import { Injectable } from "@angular/core"
import { LoadingController } from "@ionic/angular"
import { loginFirebaseService } from "./loginFirebase.service"


@Injectable()
export class loginService{
    
    
  

    constructor(private loadingCtrl: LoadingController, private loginFirebase : loginFirebaseService){
        
    }

    setRegister(email : string, password : string){
        
        return this.loginFirebase.createUserWithEmailAndPassword(email,password)
    }

    login(email : string, password : string)   {

       return this.loginFirebase.signInWithEmailAndPassword(email,password)

    }

  

}