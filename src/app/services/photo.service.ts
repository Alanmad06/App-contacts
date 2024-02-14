import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { UserPhoto } from '../interface/photo.interface';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo : UserPhoto

  public async addProfile() {
    
    let capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo={
     
      filepath: "user photo",
      webviewPath: capturedPhoto.webPath!,
      path:capturedPhoto.path

      
    }
   

    console.log("webpath:",this.photo.webviewPath)
  }

  

}
