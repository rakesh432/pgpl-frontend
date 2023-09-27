import { EventEmitter, Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { AppService } from './app.service';
import { AuthInfo, TokenInfo } from '../interface/token';
import { LoaderService } from './loader.service';
import * as md5 from 'md5';
import { Capacitor } from '@capacitor/core';
import jwtDecode from 'jwt-decode';
import storage from '../utils/storage';
import * as moment from 'moment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserAuthenticated = false;
  authenticationInfo?: AuthInfo;
  userAppId?: number;
  isAppLoading: boolean = true;
  // refreshTimeout?: NodeJS.Timeout;

  constructor(
    private serverService: ServerService,
    private appService: AppService,
    private loaderService: LoaderService,
    private loggerService: LoggerService
  ) {
    this.onStopLoading.subscribe(() => {
      this.isAppLoading = false;
    });
  }

  onStopLoading = new EventEmitter<boolean>();

  loginWithUserNameOrEmail(data: LoginWithUserNameOrEmail): Promise<number> {
    return new Promise((resolve, reject) => {
      this.loaderService.onLoadingChange.emit(true);
      this.serverService
        .post('login', {
          username: data.userId,
          password: md5(data.password),
          client_id: this.appService.getClientId(),
          grant_type: 'password',
          isApp: ['ios', 'android'].includes(Capacitor.getPlatform()),
        })
        .then(async (response) => {
          await this.setToken(response.token, response.refreshToken);
          this.isUserAuthenticated = true;
          resolve(this.authenticationInfo?.tokenInfo.sub as number);
        })
        .catch((error) => {
          this.loggerService.logError(error);
          reject(error);
        })
        .finally(() => {
          this.loaderService.onLoadingChange.emit(false);
        });
    });
  }

  async setToken(token: string, refreshToken: string) {
    if (typeof window !== undefined) {
      const tokenInfo: any = jwtDecode(token);
      this.authenticationInfo = {
        token,
        refreshToken,
        tokenInfo,
      };
      await storage.set(
        'auth-x-token',
        JSON.stringify(this.authenticationInfo)
      );
      // this.notificationService.removeSseNotification();
      // this.notificationService.addSseNotification();
      const endTime = moment(this.authenticationInfo.tokenInfo.exp * 1000);
      const timeDifference = endTime.diff(moment(), 'milliseconds') - 100000;
      setTimeout(() => {
        this.refreshToken(refreshToken);
      }, timeDifference);
    }
  }

  refreshToken(refreshToken: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.loaderService.onLoadingChange.emit(true);
      this.serverService
        .post(`login`, {
          refreshToken,
          grant_type: 'refresh_token',
          client_id: this.appService.getClientId(),
          isApp: ['ios', 'android'].includes(Capacitor.getPlatform()),
        })
        .then(async (response) => {
          await this.setToken(response.token, response.refreshToken);
          resolve(response);
        })
        .catch(async (error) => {
          if (error.status === 401) {
            this.isUserAuthenticated = false;
            this.authenticationInfo = undefined;
            await storage.del('auth-x-token');
          }
          reject(error);
        })
        .finally(() => {
          this.loaderService.onLoadingChange.emit(false);
        });
    });
  }

  hydrate(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (typeof window === undefined) {
        resolve(false);
        this.onStopLoading.emit(false);
      } else {
        const stringToken = await storage.get('auth-x-token');
        if (stringToken && stringToken !== null) {
          const tokenData: AuthInfo = JSON.parse(stringToken);
          const tokenInfo: TokenInfo = jwtDecode(tokenData.token);
          const end = moment(tokenInfo.exp * 1000);
          if (end > moment()) {
            this.refreshToken(tokenData.refreshToken)
              .then((response) => {
                resolve(true);
                this.isUserAuthenticated = true;
                this.onStopLoading.emit(true);
              })
              .catch((error) => {
                reject(error);
                this.onStopLoading.emit(false);
              });
          } else {
            storage.del('auth-x-token');
            resolve(false);
            this.onStopLoading.emit(false);
          }
        } else {
          resolve(false);
          this.onStopLoading.emit(false);
        }
      }
    });
  }
}

interface LoginWithUserNameOrEmail {
  userId: string;
  password: string;
}
