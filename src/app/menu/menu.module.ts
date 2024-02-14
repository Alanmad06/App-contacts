import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule ,IonicModule
  ],
  exports :[MenuComponent]
})
export class MenuModule  { 

  

 
}
