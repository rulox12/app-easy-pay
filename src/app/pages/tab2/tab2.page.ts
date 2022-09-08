import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../../services/payment.service';
import {Router} from '@angular/router';
import {StorageHelper} from '../../helpers/storage.helper';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  document: '';
  payments = null;
  user;

  constructor(
    private paymentService: PaymentService,
    private route: Router,
    private storageHelper: StorageHelper,
    private alertController: AlertController
  ) {
  }

  ngOnInit(): void {
    this.storageHelper.get('user').then(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  back() {
    this.route.navigate(['/tabs']);
  }

  getPayment() {
    this.paymentService.getAllPaymentByDocument(this.document).then(async response => {
      this.payments = response.payments;
      // eslint-disable-next-line eqeqeq
      if (this.payments.length == 0) {
        const alert = await this.alertController.create({
          cssClass: 'custom-alert',
          message: 'No se encontraron pagos para el documento: ' + this.document ?? '',
          buttons: ['Ok'],
        });
        await alert.present();
      }
    }, error => {
      console.log(error);
    });
  }

  getPaymentByDocument() {
    console.log(this.user);
    this.document = this.user.document;
    this.getPayment();
  }
}
