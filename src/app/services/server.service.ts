import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';
import storage from '../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private readonly httpClient: HttpClient,
    private appService: AppService
  ) {}

  get(url: string, params?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      Object.keys(params || {}).forEach((key) => {
        if ((params[key] === undefined, params[key] == null)) {
          delete params[key];
        }
      });
      this.httpClient.get(`${environment.api_uri}${url}`, {
        params: {
          ...params,
          // lang: this.appService.getCurrentLocal(),
          clientId: this.appService.getClientId(),
        },
        headers: await this.getHeaders(),
      });
    });
  }

  private async getHeaders() {
    const token = await storage.get('auth-x-token');
    return {
      accept: 'application/json',
      authorization: token ? `Bearer ${JSON.parse(token).token}` : '',
      'x-pgpl-client_id': this.appService.getClientId() || '',
    };
  }
}
