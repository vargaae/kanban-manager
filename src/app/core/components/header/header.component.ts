import { Component, HostListener, OnInit } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }

  appUser: AppUser;

  constructor(public auth: AuthService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }

  logout() {
    this.auth.logout();
  }

  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById('myBtn').style.display = 'block';
    } else {
      document.getElementById('myBtn').style.display = 'none';
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
