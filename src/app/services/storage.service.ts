import { inject } from "@angular/core";
import { Storage, StorageReference, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";

export class storageService{

    storage: Storage = inject(Storage);

    imageReference: StorageReference;


    addImage(image: any) {
        this.imageReference = ref(this.storage, '' + image.name);
        return uploadBytes(this.imageReference, image)
      }


    getImage(link : string){
        let imageRef = ref(this.storage, link);
        return getDownloadURL(imageRef);
    }

}