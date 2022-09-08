import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenHelper} from '../helpers/token.helper';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public url = environment.api;

  constructor(
    private http: HttpClient,
    private tokenHelper: TokenHelper,
    private alertController: AlertController,
  ) {
  }

  generatePayment(data) {
    return new Promise<any>(resolve => {
      this.tokenHelper.getToken().then(token => {
        if (token && typeof token === 'string') {
          const headers = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: token
          });
          this.http.post<any>(this.url + 'payment/generate', data, {headers}).subscribe(response => {
            if (response) {
              resolve(response);
            } else {
              resolve(false);
            }
          }, error => {
            this.presentAlert(error.error.message).then();
          });
        }
      });
    });
  }

  getAllPayment() {
    return new Promise<any>(resolve => {
      this.tokenHelper.getToken().then(token => {
        if (token && typeof token === 'string') {
          const headers = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: token
          });
          this.http.get<any>(this.url + 'payment/get-all', {headers}).subscribe(response => {
            if (response) {
              resolve(response);
            } else {
              resolve(false);
            }
          }, error => {
            this.presentAlert(error.error.message).then();
          });
        }
      });
    });
  }

  getAllPaymentByDocument(document: string) {
    return new Promise<any>(resolve => {
      this.http.get<any>(this.url + 'payment/get-payments-by-document/' + document).subscribe(response => {
        if (response) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, error => {
        this.presentAlert('No se encontraron pagos').then();
      });
    });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Opss',
      message,
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  getPaymentByReference(reference) {
    return new Promise<any>(resolve => {
      this.http.get<any>(this.url + 'payment/get/' + reference).subscribe(response => {
        if (response) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, error => {
        this.presentAlert('No se encontraron pagos').then();
      });
    });
  }
}
