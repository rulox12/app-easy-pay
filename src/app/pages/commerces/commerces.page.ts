import {Component, OnInit} from '@angular/core';
import {CommercesService} from '../../services/commerces.service';
import {Router} from '@angular/router';
import {StorageHelper} from '../../helpers/storage.helper';
import {BillService} from '../../services/bill.service';
import {FavoriteService} from '../../services/favorite.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-commerces',
  templateUrl: './commerces.page.html',
  styleUrls: ['./commerces.page.scss'],
})
export class CommercesPage implements OnInit {
  id: any;
  document: '';
  commerce: any;
  user: any;
  favorite = false;

  constructor(
    private commerceService: CommercesService,
    private billService: BillService,
    private favoriteService: FavoriteService,
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
    this.storageHelper.get('commerce').then(response => {
      this.commerce = response;
      if (this.user && this.commerce) {
        this.favoriteService.existFavorite({
          // eslint-disable-next-line no-underscore-dangle
          user: this.user._id,
          // eslint-disable-next-line no-underscore-dangle
          commerce: this.commerce._id
        }).subscribe(responseCommerce => {
          this.favorite = responseCommerce.exist;
        });
      }
    });
  }

  login() {
    this.storageHelper.remove('bills').then(r => {
      if (this.document) {
        // eslint-disable-next-line no-underscore-dangle
        this.billService.getBillsForDocument(this.commerce._id, this.document).then(response => {
          this.storageHelper.set('bills', response);
          this.route.navigate(['/bills']).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  back() {
    this.route.navigate(['/tabs']);
  }

  getBillByDocument() {
    this.document = this.user.document;
    this.login();
  }

  addFavorite() {
    const request = {
      // eslint-disable-next-line no-underscore-dangle
      user: this.user._id,
      // eslint-disable-next-line no-underscore-dangle
      commerce: this.commerce._id
    };

    this.favoriteService.addFavorite(request).subscribe(async (response) => {
      const alert = await this.alertController.create({
        message: 'Agregado correctamente',
        buttons: ['perfecto'],
      });
      await alert.present().then(r => {
        this.ngOnInit();
      });
    });
  }

  deleteFavorite() {
    const request = {
      // eslint-disable-next-line no-underscore-dangle
      user: this.user._id,
      // eslint-disable-next-line no-underscore-dangle
      commerce: this.commerce._id
    };

    this.favoriteService.deleteFavorite(request).subscribe(async (response) => {
      const alert = await this.alertController.create({
        message: 'Eliminado correctamente',
        buttons: ['perfecto'],
      });
      await alert.present().then(r => {
        this.ngOnInit();
      });
    });
  }
}
