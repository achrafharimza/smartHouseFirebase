import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  currentuser: any = null;
  ngOnInit(): void {
    console.log('ngOnInit');
    this.userService.authStatus.subscribe((res) => {
      this.currentuser = localStorage.getItem('email');
      console.log('currentuserNG : ', this.currentuser);
    });
  }

  logout() {
    this.currentuser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
