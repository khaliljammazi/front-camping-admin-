import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {

  loginForm2!: FormGroup;
  formSubmitted: boolean = false;
  loading: boolean = false;
  returnUrl: string = '/';
  error: string = '';
  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.loginForm2 = this.fb.group({
      email: ['ubold@coderthemes.com', [Validators.required, Validators.email]],
      password: ['test', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/stat';
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() { return this.loginForm2.controls; }


  /**
   * On submit form
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm2.valid) {
      this.loading = true;
      this.authenticationService.logIn(this.formValues.email?.value, this.formValues.password?.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate([this.returnUrl]);
          },
          (error: any) => {
            this.error = error;
            this.loading = false;
          });
    }
  }

}
