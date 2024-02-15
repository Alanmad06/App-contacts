import { Injectable, inject } from "@angular/core";
import { Auth, GoogleAuthProvider, User, authState, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { usuariosFirebaseService } from "./usuariosFirebase.service";
import { User as UserI } from "../interface/user.interface";

@Injectable()
export class loginFirebaseService{

   
    auth : Auth = inject(Auth);
    authStateSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);


    constructor(private usuariosFirebase : usuariosFirebaseService){
        this.onAuthStateChange();
    }

    createUserWithEmailAndPassword(email : string , password : string){
        return createUserWithEmailAndPassword(this.auth, email, password)
    }

    signInWithEmailAndPassword(email : string , password : string){
        return signInWithEmailAndPassword(this.auth,email,password)
    }

    signInWithGoogle(){
        return signInWithRedirect(this.auth,new GoogleAuthProvider())
    }

    private onAuthStateChange(): void {
        onAuthStateChanged(this.auth, (user) => {
          console.log("User register ",user)
          
          this.authStateSubject.next(user)
          
          if(user){
            let userAux : UserI  ={
                email : user.email!,
                contactos : []
            }
            this.usuariosFirebase.addUsuario(userAux).then(res =>{
                console.log("User registered Firestore",res)
            }).catch(e =>{

                console.log("Error in User registered Firestore",e)

            })
          }
        });
      }

    getAuthState(): BehaviorSubject<User | null> {
        return this.authStateSubject;
       }

       logOut(){
        this.authStateSubject.next(null)
        this.usuariosFirebase.destroyUser()
        return this.auth.signOut()
       }


    resetPasswordWithEmail(email : string){
       return sendPasswordResetEmail(this.auth,email)

    }
         
    

    


}