import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-signin-signup2',
  templateUrl: './signin-signup2.component.html',
  styleUrls: ['./signin-signup2.component.scss']
})
export class SigninSignup2Component implements OnInit {

  currentYear!: number;
  active: string = 'login';
  returnUrl: string = '/';
  loading: boolean = false;

  loginForm2!: FormGroup;
  loginFormSubmitted: boolean = false;
  loginError: string = '';

  signUpForm2!: FormGroup;
  signupFormSubmitted: boolean = false;
  signupError: string = '';


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentYear = Date.now();

    this.loginForm2 = this.fb.group({
      email: ['ubold@coderthemes.com', [Validators.required, Validators.email]],
      password: ['test', Validators.required]
    });

    this.signUpForm2 = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/stat';
  }


  /**
   * convenience getter for easy access to form fields
   */
  get loginFormFields() { return this.loginForm2.controls; }

  /**
   * convenience getter for easy access to form fields
   */
  get signupFormFields() {
    return this.signUpForm2.controls;
  }
  
  get signupUser() {
    let user = new User();
    user.email = this.signupFormFields.email?.value;
    user.nom = this.signupFormFields.name?.value;
    user.password = this.signupFormFields.password?.value;
    return user;
  }

  /**
  * On login form submit
  */
  onLogin(): void {
    this.loginFormSubmitted = true;
    if (this.loginForm2.valid) {
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

  /**
 * On signup form submit
 */
  onSignup(): void {
    this.signupFormSubmitted = true;
    if (this.signUpForm2.valid) {
      this.loading = true;
      this.authenticationService.register(this.signupUser)
        .pipe(first())
        .subscribe(
          (data: any) => {
            // navigates to confirm mail screen
            this.router.navigate(['/auth/confirm2']);
          },
          (error: any) => {
            this.signupError = error;
            this.loading = false;
          });
    }
  }

}
