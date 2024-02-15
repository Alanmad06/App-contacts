import { Injectable, inject } from "@angular/core";
import { Storage, StorageReference, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";
import { usuariosFirebaseService } from "./usuariosFirebase.service";
import { User } from "../interface/user.interface";

@Injectable()
export class storageService{

    user : User
    storage: Storage = inject(Storage);

    imageReference: StorageReference;

    constructor(){
  
}

    addImage(image: any , user : User) {
        console.log("imagen firebase storage", image)
        this.imageReference = ref(this.storage, '' + user.email);
        
        return uploadBytes(this.imageReference, image)
      }


    getImage(link : string){
        let imageRef = ref(this.storage, link);
        return getDownloadURL(imageRef);
    }

    async getRealImage(link:string){
        try{
            const img = await this.getImage(link)
            console.log("Get Real Image")
            return img;

        }catch(e) {
            console.log("Error Get Real Image")
        }
        return 
    }

}