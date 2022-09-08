import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenHelper} from '../helpers/token.helper';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public url = environment.api;

  constructor(
    private http: HttpClient,
    private tokenHelper: TokenHelper,
    private alertController: AlertController,
  ) {
  }

  getBillsForDocument(idCommerce: string, document: string) {
    console.log(document, idCommerce);
    return new Promise<any>(resolve => {
      this.tokenHelper.getToken().then(token => {
        if (token && typeof token === 'string') {
          const headers = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: token
          });
          this.http.get<any>(this.url + 'bill/bill-by-user-commerce/' + document + '/' + idCommerce).subscribe(response => {
            if (response) {
              console.log('holar', response);
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

}
