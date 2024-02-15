import { Component, OnInit, ViewChild } from '@angular/core';
import { Contactos } from 'src/app/interface/contactos.interface';
import { userService } from '../services/user.service';
import { IonModal } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Contacts } from '@capacitor-community/contacts';
import { Geolocation } from '@capacitor/geolocation';
import { usuariosFirebaseService } from '../services/usuariosFirebase.service';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  contacs :any[] =[]
  contactos : Contactos[] =[]
  contacto : Contactos = this.resetContacto()
  center : google.maps.LatLngLiteral ;
  zoom : any;
  display : google.maps.LatLngLiteral;
  markerPositions : google.maps.LatLngLiteral[] =[];
  locationContacto : any ={};
  markerOptions: google.maps.MarkerOptions;


  constructor( private userService : userService , private toastr : ToastrService, private usuariosFirebase : usuariosFirebaseService) {

    this.usuariosFirebase.getUsuarios().subscribe(res=>{
      if(res)
      this.contactos = res[0].contactos!
    })

   }

  ngOnInit() {
    this.getContacts()
    this.getLocation()
    this.contactos = this.userService.getContactos()!
    
    this.zoom = 8;
    this.markerOptions = {
      draggable:true
  }
  }
  

  resetContacto(){
    if(this.markerPositions)this.markerPositions.pop()
    
    return{
      nombre :"",
      numero : "",
      nota : "",
      longitud:"",
      latitud:""
    }
    
  
  }

  checkMarkerLocation(){
    if(this.markerPositions.length===1){
      this.contacto.latitud = ""+this.markerPositions[0].lat
      this.contacto.longitud = ""+this.markerPositions[0].lng
    }
  }

  agregarContacto(){
    this.checkMarkerLocation()
    this.userService.agregarContacto(this.contacto)
    this.toastr.success("Contacto Agregado Exitosamente","",{
      timeOut: 3000
    })
    this.contacto=this.resetContacto()
    this.cancel()
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
    
    
  }

  async getLocation(){
    try{
      const permission = await Geolocation.requestPermissions()
      console.log("permisos",permission)
      if(!permission.location){
        console.log("permiso denegado")

      }else if(permission.location=="granted"){
        const result = await Geolocation.getCurrentPosition()
        console.log(result)
        this.contacto.longitud= ""+result.coords.longitude
        this.contacto.latitud = ""+result.coords.latitude
        this.locationContacto ={lat: +this.contacto.latitud!, lng:+this.contacto.longitud! };
    this.center = this.locationContacto ;
    console.log(this.center)
      }
    }catch(e){
      console.log(e)

    }
  }

  async getContacts(){
    try{
      const permission = await Contacts.requestPermissions()
      console.log("permisos",permission)
      if(!permission.contacts){
        console.log("permiso denegado")

      }else if(permission.contacts=="granted"){
        const result = await Contacts.getContacts({
       projection:{
name:true,
phones:true
       }
          
        })

        console.log(result)
        this.contacs=result.contacts
        console.log(this.contacs)
      }
    }catch(e){
      console.log(e)

    }
  }

  
  moveMap(event: google.maps.MapMouseEvent) {
    if(!event.latLng)return
    this.center = (event.latLng.toJSON());
  }

  addMarker(event: google.maps.MapMouseEvent){
    if(!event.latLng)return
    else if(this.markerPositions.length===0)
    this.markerPositions.push(event.latLng.toJSON())
  }

  move(event: google.maps.MapMouseEvent) {
    if(!event.latLng)return
    this.display = event.latLng.toJSON();
  }
 
}