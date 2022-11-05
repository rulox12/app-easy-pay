import {Component, OnInit} from '@angular/core';
import {CommercesService} from '../../services/commerces.service';
import {Router} from '@angular/router';
import {StorageHelper} from '../../helpers/storage.helper';
import {MenuController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  commerces: any;
  item = {id: 1, name: 'Top Up', src: 'assets/icons/top-up.png', background: 'rgba(27,150,181, 0.1)', page: ''};
  searchText: any;
  public baseUrlForImage = environment.api + 'commerce/getImage/';
  existUser = false;

  constructor(
    private commerceService: CommercesService,
    private router: Router,
    private storageHelper: StorageHelper,
    private menu: MenuController,
  ) {
  }

  async ngOnInit() {
    this.commerceService.getAllCommerces().then(response => {
      this.commerces = response;
    });
    this.storageHelper.get('user').then(response => {
      if (!(response === null)) {
        this.existUser = true;
      }
    });
  }

  getBills() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  goCommerce(commerce) {
    // eslint-disable-next-line no-underscore-dangle
    this.router.navigate(['/commerces', {id: commerce._id}]);
  }

  search(event) {
    this.searchText = event.detail.value;
  }

  go(path: string) {
    this.router.navigate([path]);
  }
}
