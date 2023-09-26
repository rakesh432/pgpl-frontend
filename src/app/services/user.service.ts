import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private user?: User;

  getUser(): User | undefined {
    return this.user;
  }

  getUserPermissions(): string[] | undefined {
    return this.user?.permissions;
  }
}
