import { inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';


export class usuariosFirebaseService {
  firestore: Firestore = inject(Firestore);
  usuariosCollection: CollectionReference;
  usuario: Observable<User[] | null> ;

  constructor() {
    this.usuariosCollection = collection(this.firestore, 'usuarios');
    const q = query(this.usuariosCollection);

    this.usuario = collectionData(q) as Observable<User[]>
    
  }

  getUserByEmail(usuario: User) {
    return query(this.usuariosCollection, where('email', '==', usuario.email));
  }

  getUsuarios() {
    return this.usuario;
  }

  getUsuario(usuario : User){
    const getEmail = this.getUserByEmail(usuario);
      this.usuario = collectionData(getEmail,{idField : 'id'}) as Observable<User[]>
  }

  addUsuario(usuario: User) {
    return new Promise((resolve, reject) => {
      const getEmail = this.getUserByEmail(usuario);
      console.log("Query ", getEmail)
      
    

      if (!getEmail) {
       
        resolve(addDoc(this.usuariosCollection, usuario));
      } else {
        reject('Usuario Ya registrado');
      }
    });
  }

  editUsuario(usuario: User) {
    let docRef = doc(this.firestore, 'usuarios', usuario.id!);
    updateDoc(docRef, {
      email: usuario.email,
    });
  }

  updateContactos(usuario: User) {
    let docRef = doc(this.firestore, 'usuarios', usuario.id!);
    updateDoc(docRef, {
      contactos: usuario.contactos,
    });
  }
}
