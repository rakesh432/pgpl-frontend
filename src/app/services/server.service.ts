import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';
import storage from '../utils/storage';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private readonly httpClient: HttpClient,
    private appService: AppService
  ) {}

  async get<T>(url: string, params?: any): Promise<T> {
    if (window && !window.navigator.onLine) {
      throw new Error('Internet not avaiable');
    }
    // const token = window.localStorage.getItem('auth-x-token')
    Object.keys(params || {}).forEach((key) => {
      if ((params[key] === undefined, params[key] == null)) {
        delete params[key];
      }
    });
    return firstValueFrom(
      this.httpClient.get<T>(`${environment.api_uri}${url}`, {
        params: { ...params },
        headers: await this.getHeaders(),
      })
    );
  }

  post<T>(url: string, data: any, params?: any): Promise<T | any> {
    return new Promise(async (resolve, reject) => {
      // const token = window.localStorage.getItem('auth-x-token');
      if (window && !window.navigator.onLine) {
        reject(new Error('Internet not avaiable'));
        return;
      }
      Object.keys(data).forEach((key) => {
        if (data[key] === undefined || data[key] == '') {
          delete data[key];
        }
      });
      Object.keys(params || {}).forEach((key) => {
        if (params[key] === undefined || params[key] == '') {
          delete params[key];
        }
      });

      this.httpClient
        .post<T>(`${environment.api_uri}.${url}`, data, {
          params: { ...params, clientId: this.appService.getClientId() },
          headers: await this.getHeaders(),
        })
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (error: HttpErrorResponse) => reject(error),
        });
    });
  }

  async patch<T>(url: string, data: any, params?: any): Promise<T> {
    if (window && !window.navigator.onLine) {
      throw new Error('Internet not available');
    }
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] == '') {
        delete data[key];
      }
    });
    Object.keys(params || {}).forEach((key) => {
      if (params[key] === undefined || params[key] == '') {
        delete params[key];
      }
    });
    return firstValueFrom(
      this.httpClient.patch<T>(`${environment.api_uri}${url}`, data, {
        params: { ...params, clientId: this.appService.getClientId() },
        headers: await this.getHeaders(),
      })
    );
  }

  async delete<T>(url: string, params: any): Promise<T> {
    if (window && !window.navigator.onLine) {
      throw new Error('Internet not available');
    }
    Object.keys(params || {}).forEach((key) => {
      if (params[key] === undefined || params[key] == '') {
        delete params[key];
      }
    });
    return firstValueFrom(
      this.httpClient.delete<T>(`${environment.api_uri}${url}`, {
        params: { ...params, clientId: this.appService.getClientId() },
        headers: await this.getHeaders(),
      })
    );
  }

  put<T>(url: string, data: File): Promise<T> {
    if (window && !window.navigator.onLine) {
      throw new Error('Internet not availble');
    }
    return firstValueFrom(
      this.httpClient.put<T>(`${environment.api_uri}${url}`, data, {
        headers: { accept: 'application/json', 'Content-Type': data.type },
      })
    );
  }

  async getDocument(url: string, params?: any): Promise<any> {
    if (window && !window.navigator.onLine) {
      throw new Error('Internet not availble');
    }
    Object.keys(params || {}).forEach((key) => {
      if (params[key] === undefined || params[key] == '') {
        delete params[key];
      }
    });
    return firstValueFrom(
      this.httpClient.get(`${environment.api_uri}${url}`, {
        params: {
          ...params,
          clientId: this.appService.getClientId(),
        },
        headers: await this.getHeaders(),
        responseType: 'blob',
        observe: 'response',
      })
    );
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
