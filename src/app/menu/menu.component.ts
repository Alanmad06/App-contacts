import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input('name') name : string 

  constructor(private router : Router) { }

  ngOnInit() {}

  navigate(){
    this.router.navigate(["/configuracion"])
    console.log("navegar")
  }

  toggle(event:any){

    const checked = event.detail.checked
    document.body.classList.toggle('dark', checked);

  }

}
