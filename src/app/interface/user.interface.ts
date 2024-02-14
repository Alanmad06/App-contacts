

import { Contactos } from "./contactos.interface"


export interface User{
    id?:string
    email : string
    contactos ?: Contactos[]

   
   
}