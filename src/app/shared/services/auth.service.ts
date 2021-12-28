import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth
    ) {
      this.user$ = afAuth.authState;
      afAuth.authState
      .subscribe(x => console.log(x));
  }

loginWithGoogle() {
  this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
  this.router.navigate(['/']);
}

logout(): void {
  this.afAuth.signOut();
  this.router.navigate(['/login']);
}

get appUser$() : Observable<AppUser> {
  return this.user$
  .pipe(
    switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();

      return of(null);
    }));
  }

}
