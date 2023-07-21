import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  returnUrl: string = '/';

  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';

  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  /**
 * convenience getter for easy access to form fields
 */
  get formValues() { return this.loginForm.controls; }



  /**
   * On submit form
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authenticationService.logIn(this.formValues.email?.value, this.formValues.password?.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          },
          (error: any) => {
            console.log(error);
            if((error as String).includes("400")) error = "Bad credentials";
            this.error = error;
            this.loading = false;
          });
    }
  }

}
