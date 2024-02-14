import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contactos } from 'src/app/interface/contactos.interface';
import { userService } from 'src/app/services/user.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  contacto : Contactos= {
    nombre :"",
    numero : "",
    nota : "",
    longitud:"",
    latitud:""
  }
  id : number
  locationContacto : any ={};
  center : google.maps.LatLngLiteral ;
  zoom : any;
  display : google.maps.LatLngLiteral;
  markerPositions : google.maps.LatLngLiteral[] ;
  constructor(private route : ActivatedRoute , private userService : userService , private Router : Router) { 
    this.id=this.route.snapshot.params[('id')]
  }

  ngOnInit() {
    this.contacto = this.userService.getContactobyIndex(this.id)
    console.log(this.contacto)
    this.locationContacto ={lat: +this.contacto.latitud!, lng:+this.contacto.longitud! };
    this.center = this.locationContacto ;
    console.log(this.center)
    this.zoom = 18;
    
    this.markerPositions  = [this.locationContacto ];
  }

  save(){
    this.userService.actualizarContacto(this.contacto,this.id)
  }

  delete(){
    this.userService.deleteContacto(this.id);
    this.Router.navigate(["/contactos"])
  }
   

 

  moveMap(event: google.maps.MapMouseEvent) {
    if(!event.latLng)return
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if(!event.latLng)return
    this.display = event.latLng.toJSON();
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
};

}
