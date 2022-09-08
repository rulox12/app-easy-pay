import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {StorageHelper} from './storage.helper';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenHelper {

  constructor(
    private storage: StorageHelper,
    private auth: AuthService
  ) {
  }


  async getToken(): Promise<boolean | string> {
    if (await this.tokenExist()) {
      if (await this.validaToken(await this.storage.get('token'))) {
        return Promise.resolve(await this.storage.get('token'));
      } else {
        return new Promise<boolean | string>(resolve => {
          this.auth.signIn().subscribe(async response => {
            if (response) {
              this.storage.set('token', response.token);
              resolve(response.token);
            }
          });
        });
      }
    } else {
      return new Promise<boolean | string>(resolve => {
        this.auth.signIn().subscribe(async response => {
          if (response) {
            this.storage.set('token', response.token);
            resolve(response.token);
          } else {
            //@todo generate exception
          }
        });
      });
    }
  }

  async validaToken(tokenStorage): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const tokenDecode = this.decodeToken(tokenStorage);
      if (tokenDecode) {
        // @ts-ignore
        resolve(Date.now() < 1000 * tokenDecode.exp);
      } else {
        resolve(false);
      }
    });
  }

  decodeToken(token) {
    return jwt_decode(token);
  }

  async tokenExist() {
    return await this.storage.get('token');
  }
}
