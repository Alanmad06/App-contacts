import { Injectable, inject } from '@angular/core';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { getDocs } from 'firebase/firestore';
import { storageService } from './storage.service';

@Injectable()
export class usuariosFirebaseService {
   firestore: Firestore = inject(Firestore);
  usuariosCollection: CollectionReference;
  usuario: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(
    null
  );

  constructor(private storageFirebase : storageService) {
    this.usuariosCollection = collection(this.firestore, 'usuarios');

    //this.usuario = collectionData(this.usuariosCollection) as Observable<User[]>
  }

  getUserByEmail(usuario: User) {
    return query(this.usuariosCollection, where('email', '==', usuario.email));
  }

  getUsuarios() {
    return this.usuario;
  }

  addUsuario(usuario: User) {
    return new Promise((resolve, reject) => {
      const getEmail = this.getUserByEmail(usuario);
      const res = collectionData(getEmail, { idField: 'id' }) as Observable<
        User[]
      >;
      res.subscribe((observer) => {
        this.usuario.next(observer);
      });

      console.log('query ', getEmail, ' Ususairo ', usuario);

      getDocs(getEmail)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            resolve(addDoc(this.usuariosCollection, usuario));
          } else {
            reject('Usuario Ya registrado');
          }
        })
        .catch((error) => {
          console.error('Error al realizar la consulta:', error);
        });

      getDocs(getEmail);
      if (!getEmail) {
      } else {
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

  addPfp(usuario : User){

let docRef = doc(this.firestore, 'usuarios', usuario.id!);
 this.storageFirebase.getRealImage(usuario.email).then(img=>{
  updateDoc(docRef, {
    pfp: img
  });
 })

  }

  destroyUser() {
    this.usuario = new BehaviorSubject<User[] | null>(null);
  }
}
