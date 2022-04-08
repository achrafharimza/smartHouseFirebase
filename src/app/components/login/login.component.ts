import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  loguser: User = {
    nom: 'achraf',
    email: 'achraf@gmail.com',
    password: 'achraf',
  };

  ngOnInit(): void {}

  formIsValid() {
    return this.loguser.email != '' && this.loguser.password != '';
  }
  loginUser() {
    this.userService.login(this.loguser).subscribe((res) => {
      // console.log('res : ', res);
      const token: any = res[0].accessToken;
      // console.log('token : ', token);
      const emailToken = this.payload(res[0].accessToken).email;
      // console.log(token);

      if (this.loguser.email === emailToken) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', emailToken);
        this.userService.changeStatus(true);
        this.router.navigate(['/home']);
      }
    });
  }
  decode(payload: any) {
    // console.log('payload : ', payload);
    return JSON.parse(atob(payload));
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    // console.log('payload : ', payload);
    return this.decode(payload);
  }
}
