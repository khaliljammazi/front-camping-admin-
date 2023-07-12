import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-lock-screen2',
  templateUrl: './lock-screen2.component.html',
  styleUrls: ['./lock-screen2.component.scss']
})
export class LockScreen2Component implements OnInit {

  lockScreenForm2!: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';
  loggedInUser!: User;

  constructor (
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.lockScreenForm2 = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.authenticationService.sharedUser.subscribe((data) => {
      next: {
        this.loggedInUser = data;
      }
    });
  }

  /**
 * convenience getter for easy access to form fields
 */
  get formValues() {
    return this.lockScreenForm2.controls;
  }



  /**
   * On submit form
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.lockScreenForm2.valid) {
      this.authenticationService.logIn(this.loggedInUser?.email!, this.formValues.password?.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate(['/']);
          },
          (error: any) => {
            this.error = error;
          });
    }
  }

}
