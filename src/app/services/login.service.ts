import { Injectable } from "@angular/core"
import { LoadingController } from "@ionic/angular"


@Injectable()
export class loginService{
    
    email : string 
    password : string
    islogged = false

    constructor(private loadingCtrl: LoadingController){
        
    }

    async setRegister(email : string, password : string){
        this.email = email
        this.password = password
        const loading = await this.loadingCtrl.create({
            duration: 1000,
            spinner: 'circles',
          });
    
          loading.present();
    }

    login(email : string, password : string) : Promise<boolean>  {

        return new Promise(async (resolve, reject)=>{
            if(email===this.email && password===this.password){
                const loading = await this.loadingCtrl.create({
                    duration: 1000,
                    spinner: 'circles'
                  });
              
                  loading.present();
                resolve(true)
            }else{
                reject(false)
            }
        })

    }

    getIsLogged(){
        return this.islogged
    }

    changeLogged(){
        this.islogged = true
    }


}