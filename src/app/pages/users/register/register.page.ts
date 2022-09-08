import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router
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

  submitForm() {
    console.log(this.userForm);
  }

  back() {
    this.route.navigate(['/tabs']);
  }
}
