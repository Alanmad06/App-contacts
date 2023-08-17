import { NgModule } from '@angular/core';
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


@NgModule({
    declarations: [AppComponent],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, userService, loginService , authGuard],
    bootstrap: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MenuModule , ToastNoAnimationModule.forRoot()]
})
export class AppModule {}
