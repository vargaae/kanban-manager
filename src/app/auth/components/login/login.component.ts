import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  appUser: AppUser;


  constructor(
    public auth: AuthService,
    private router: Router
    ) {

    }

    loginWithGoogle() {
      this.auth.loginWithGoogle();
    }

}
