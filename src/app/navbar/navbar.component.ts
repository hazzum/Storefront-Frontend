import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName!: string;
  islogged!: boolean;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.userName = ', ' + (jwtDecode(this.auth.getToken()) as any).name
    if (this.userName) { this.islogged = true }
  }

  signOut(): void {
    if (confirm("Are you sure you want to sign out")) {
      this.auth.signout()
      this.islogged = false
      this.userName = ''
      window.location.reload()
    }
  }
}
