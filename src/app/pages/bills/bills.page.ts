import {Component, OnInit} from '@angular/core';
import {StorageHelper} from '../../helpers/storage.helper';
import {Router} from '@angular/router';
import {PaymentService} from '../../services/payment.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  bills: any;
  urlFrontend = environment.urlFrontend;
  paymentGenerate = null;

  constructor(
    private storageHelper: StorageHelper,
    private paymentService: PaymentService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.storageHelper.get('bills').then(response => {
      this.bills = response;
    });
  }

  back() {
    this.route.navigate(['/commerces']);
  }

  makePayment(item) {
    const data = {
      reference: item.reference,
      total: item.total,
      description: item.description,
      // eslint-disable-next-line no-underscore-dangle
      bill: item._id,
    };

    this.paymentService.generatePayment(data).then(response => {
      if (response) {
        this.paymentGenerate = response;
        const returnUrl = this.urlFrontend + 'checkout';
        // eslint-disable-next-line no-underscore-dangle,max-len
        window.open(`https://checkout.wompi.co/p/?public-key=pub_test_NoArfbn1dTCcN61fSNV5cx38fVCc88bO&currency=COP&amount-in-cents=${item.total + '00'}&reference=${response.payment._id}&redirect-url=${returnUrl}`);
      }
    }, error => {
      console.log(error);
    }).then(response => {
      console.log('hola');
    });

  }

  refreshPayment() {
    console.log(this.paymentGenerate.payment);
    // eslint-disable-next-line no-underscore-dangle
    this.paymentService.getPaymentByReference(this.paymentGenerate.payment._id).then(response => {
      if (response) {
        console.log(response);
        this.paymentGenerate = response;
      }
    }, error => {
      console.log(error);
    }).then(response => {
      console.log('hola');
    });
  }
}
