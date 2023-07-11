import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-logout2',
  templateUrl: './logout2.component.html',
  styleUrls: ['./logout2.component.scss']
})
export class Logout2Component implements OnInit {

  constructor (private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.authenticationService.logOut();
  }


}
