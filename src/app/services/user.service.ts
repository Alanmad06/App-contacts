import { Injectable } from "@angular/core";
import { User } from "src/app/interface/user.interface";
import { Contactos } from "../interface/contactos.interface";


@Injectable()
export class userService{


    user : User = {
        nombre:"",
        apellido: "",
        email : "",
        birthday : "",
        sexo : "",
        contactos : []
      }

      setUser(nombre : string , apellido : string , email: string , hobbies : string[], sexo : string, birthday : string){
       this.user.nombre = nombre
       this.user.apellido = apellido
       this.user.email = email
       this.user.sexo = sexo
       this.user.hobbies = hobbies
       this.user.birthday = birthday


      }

      getUser(){
        return this.user
      }

      getContactos(){
        return this.user.contactos
      }

      agregarContacto(contacto : Contactos){
        this.user.contactos?.push(contacto)

      }

      getContactobyIndex(i:number){
        return this.user.contactos![i]
      }

      actualizarContacto(contacto: Contactos , i : number){
        this.user.contactos![i] = contacto

      }

     

      

    
    

}