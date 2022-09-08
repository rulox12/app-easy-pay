import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../../../services/favorite.service';
import {StorageHelper} from '../../../helpers/storage.helper';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  private user: boolean;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  favorites: any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  baseUrlForImage = environment.api + 'commerce/getImage/';

  constructor(
    private favoriteService: FavoriteService,
    private storageHelper: StorageHelper,
    private route: Router,
  ) {
  }

  ngOnInit() {
    this.storageHelper.get('user').then(user => {
      if (user) {
        this.user = user;
        // eslint-disable-next-line no-underscore-dangle
        this.favoriteService.getAllFavorites(user).subscribe(response => {
          this.favorites = response[0].commerces;
        });
      }
    });
  }


  back() {
    this.route.navigate(['/tabs/tab3']);
  }

  goCommerce(commerce) {
    this.storageHelper.set('commerce', commerce);
    // eslint-disable-next-line no-underscore-dangle
    this.route.navigate(['/commerces']).then(() =>{
      window.location.reload();
    });
  }
}
