import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {LoadingController} from '@ionic/angular';
import {StorageHelper} from '../../../helpers/storage.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loadingController: LoadingController,
    private route: Router,
    private storageHelper: StorageHelper
  ) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      documentType: ['', [Validators.required, Validators.minLength(2)]],
      document: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      active: [true],
      isAdmin: [false],
    });
  }

  async submitForm() {
    if (this.userForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando',
        spinner: 'circles',
      });
      loading.present();
      this.userService.singUp(this.userForm.value).then(async (response) => {
        if (response) {
          this.storageHelper.set('user', response.user);
          setTimeout(() => {
            loading.dismiss();
            this.route.navigate(['/tabs/tab1', {id: 1}]).then(() => {
              window.location.reload();
            });
          }, 2000);

        }
        console.log(response);
      });
    } else {

    }
  }

  back() {
    this.route.navigate(['/tabs']);
  }
}
