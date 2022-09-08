import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {StorageHelper} from '../../../helpers/storage.helper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private storageHelper: StorageHelper,
    public formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private route: Router,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  submitFormLogin() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe(async response => {
        if (response) {
          this.storageHelper.set('user', response.user);
          this.router.navigate(['/tabs/tab3']).then(() => {
            window.location.reload();
          });
        }
      }, async error => {
        const alert = await this.alertController.create({
          message: 'Error al ingresar',
          buttons: ['perfecto'],
        });
        await alert.present();
      });
    }
  }

  go(route: string) {
    this.router.navigate([route]);
  }

  back() {
    this.route.navigate(['/tabs/tab1']);
  }
}
