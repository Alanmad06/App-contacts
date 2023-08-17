

import { Contactos } from "./contactos.interface"


export interface User{

    nombre: string
    apellido : string
    email : string
    birthday : string
    sexo : string
    hobbies ?: string[]
    contactos ?: Contactos[]
   
}