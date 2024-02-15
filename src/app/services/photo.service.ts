import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { UserPhoto } from '../interface/photo.interface';
import { storageService } from './storage.service';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo : UserPhoto
   
  constructor(private storageFirebase: storageService){

  }

  public async addProfile(user : User) {
    let capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
    });

    this.photo = {
        filepath: "user photo",
        webviewPath: capturedPhoto.webPath!,
        path: capturedPhoto.path
    };

    console.log(capturedPhoto)
    try {

        console.log("USSERERWERR ,", user)
        // Convertir la imagen a PNG
        const convertedImageBlob = await this.convertToPNG(capturedPhoto.webPath!);
        
        // Subir la imagen convertida a Firebase Storage
       await this.storageFirebase.addImage(convertedImageBlob , user);

        console.log("Imagen cargada exitosamente!");
    } catch (error) {
        console.error("Error al cargar la imagen:", error);
    }
}

  private async convertToPNG(imagePath: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Error al convertir la imagen a PNG'));
                }
            }, 'image/png');
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = imagePath;
    });
}
}


