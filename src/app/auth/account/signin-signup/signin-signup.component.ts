import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss']
})
export class SigninSignupComponent implements OnInit {

  returnUrl: string = '/';
  loading: boolean = false;

  loginForm!: FormGroup;
  loginFormSubmitted: boolean = false;
  loginError: string = '';

  signUpForm!: FormGroup;
  signupFormSubmitted: boolean = false;
  signupError: string = '';

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    // reset login status
    this.authenticationService.logOut();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * convenience getter for easy access to form fields
   */
  get loginFormFields() { return this.loginForm.controls; }

  /**
   * convenience getter for easy access to form fields
   */
  get signupFormFields() {
    return this.signUpForm.controls;
  }

  /**
  * On login form submit
  */
  onLogin(): void {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authenticationService.logIn(this.loginFormFields.email?.value, this.loginFormFields.password?.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate([this.returnUrl]);
          },
          (error: any) => {
            this.loginError = error;
            this.loading = false;
          });
    }
  }

  get signupUser() {
    let user = new User();
    user.email = this.signupFormFields.email?.value;
    user.prenom = this.signupFormFields.name?.value;
    user.nom = this.signupFormFields.lastName?.value;
    user.password = this.signupFormFields.password?.value;
    return user;
  }

  /**
 * On signup form submit
 */
  onSignup(): void {
    this.signupFormSubmitted = true;
    if (this.signUpForm.valid) {
      this.loading = true;
      this.authenticationService.register(this.signupUser)
        .pipe(first())
        .subscribe(
          (data: any) => {
            // navigates to confirm mail screen
            this.router.navigate(['/auth/confirm']);
          },
          (error: any) => {
            this.signupError = error;
            this.loading = false;
          });
    }
  }


}
