import {Component, OnInit} from '@angular/core';
import {StorageHelper} from '../../helpers/storage.helper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public existUser = false;
  public user;

  constructor(
    private storageHelper: StorageHelper,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.storageHelper.get('user').then(user => {
      if (user) {
        this.user = user;
        this.existUser = true;
      }
    });
  }

  go(path: string) {
    this.route.navigate([path]);
  }

  logout() {
    this.storageHelper.remove('user').then(response => {
      this.route.navigate(['/tabs/tab1']).then(() => {
        window.location.reload();
      });
    });
  }

  back() {
    this.route.navigate(['/tabs/tab1']);
  }
}

