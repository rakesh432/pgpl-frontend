import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pgpl-fresh';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.authService
        .hydrate()
        .then((isUserAuthenticated) => {
          if (isUserAuthenticated) {
            const userId = this.authService.authenticationInfo?.tokenInfo.sub;
            this.userService
              .fetchUser(userId as number)
              .then((user) => {
                // this.authService.setFcmToken(user);
                // if (user.roles.includes('ROLE_TRANSPORTER')) {
                //   this.router.navigate(['tranport-request']);
                // }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.authService.isUserAuthenticated = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }
}
