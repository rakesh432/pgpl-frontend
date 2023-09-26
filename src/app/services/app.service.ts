import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  getClientId() {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('client_id');
    }
    return null;
  }
}
