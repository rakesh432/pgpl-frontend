import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { User } from '../interface/user';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ServerService } from './server.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private serverService: ServerService,
    private loggerService: LoggerService
  ) {}

  private user?: User;
  loadingSub?: Subscription;
  isAppLoading: boolean = true;
  onUserUpdate = new EventEmitter();

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.authService.isUserAuthenticated) {
        resolve(true);
      }
      if (
        !this.authService.isAppLoading &&
        !this.authService.isUserAuthenticated
      ) {
        resolve(false);
        this.router.navigate(['/login']);
      }
      if (this.authService.isAppLoading) {
        this.loadingSub = this.authService.onStopLoading.subscribe(
          (isUserAuthenticated) => {
            this.loadingSub?.unsubscribe();
            if (isUserAuthenticated) {
              resolve(true);
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
      }
    });
  }

  fetchUser(userId: number, isUpdate = true): Promise<User> {
    return new Promise((resolve, reject) => {
      this.serverService
        .get<User>(`users/${userId}`)
        .then((response) => {
          resolve(response);
          if (isUpdate) {
            this.user = response;
            this.onUserUpdate.emit(this.user);
          }
        })
        .catch((error) => {
          this.loggerService.logError(error);
          reject(error);
        });
    });
  }

  getUser(): User | undefined {
    return this.user;
  }

  getUserPermissions(): string[] | undefined {
    return this.user?.permissions;
  }
}
