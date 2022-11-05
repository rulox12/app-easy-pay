import {Component, OnInit} from '@angular/core';
import {StorageHelper} from '../../helpers/storage.helper';
import {Router} from '@angular/router';
import {error} from "protractor";
import {NavController} from "@ionic/angular";

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
      console.log('hola', user);
      if (user) {
        this.user = user;
        this.existUser = true;
      }
    }, async err => {
      console.log('hola2', err);
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

