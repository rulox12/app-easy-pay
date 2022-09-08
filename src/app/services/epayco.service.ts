import {Injectable} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare let WidgetCheckout;

@Injectable({
  providedIn: 'root'
})
export class EpaycoService {

  /*handler = ePayco.checkout.configure({
    key: '472b298748342c6f76c025cb02f71322',
    test: true
  });

  open(data) {
    this.handler.open(data);
  }
  */

  open(data) {
    const checkout = new WidgetCheckout({
      currency: 'COP',
      amountInCents: 22290000,
      reference: 'A2222202901221',
      publicKey: 'pub_test_NoArfbn1dTCcN61fSNV5cx38fVCc88bO',
    });
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    checkout.open(function(result) {
      const transaction = result.transaction;
      console.log('Transaction ID: ', transaction.id);
      console.log('Transaction object: ', transaction);
    });
  }


}
