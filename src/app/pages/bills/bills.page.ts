import {Component, OnInit, ViewChild} from '@angular/core';
import {StorageHelper} from '../../helpers/storage.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../services/payment.service';
import {environment} from '../../../environments/environment';
import {BillService} from '../../services/bill.service';
import {LoadingController} from '@ionic/angular';
import {IonModal} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  bills: any;
  billSelected= null;
  urlFrontend = environment.urlFrontend;
  paymentGenerate = null;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(
    private storageHelper: StorageHelper,
    private paymentService: PaymentService,
    private route: Router,
    private billService: BillService,
    private activateRouter: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 1200,
      spinner: 'circles',
    });

    loading.present();
    this.activateRouter.params.subscribe(params => {
      this.billService.getBillsForDocument(params.commerce, params.document).then(response => {
        this.bills = response;
      });
    });
  }

  back() {
    this.route.navigate(['/tabs/tab1']);
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

  moreInformation(item) {
    this.billSelected =  item;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
