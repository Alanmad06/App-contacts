import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from "./menu/menu.module";
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { userService } from 'src/app/services/user.service';
import { loginService } from 'src/app/services/login.service';
import { authGuard } from './guardian/auth.guardian';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { loginFirebaseService } from './services/loginFirebase.service';
import { storageService } from './services/storage.service';
import { usuariosFirebaseService } from './services/usuariosFirebase.service';
import { GoogleAuthProvider } from 'firebase/auth';


@NgModule({
    declarations: [AppComponent],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, userService, loginService , authGuard ,loginFirebaseService
        ,storageService,usuariosFirebaseService, GoogleAuthProvider
        
        
    
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MenuModule , ToastNoAnimationModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firestore)),
        provideFirestore(() => getFirestore()),
        provideAuth(()=> getAuth()),
        provideStorage(()=> getStorage())
        
    ]
})
export class AppModule {}
