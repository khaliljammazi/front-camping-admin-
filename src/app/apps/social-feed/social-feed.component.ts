import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.scss']
})
export class SocialFeedComponent implements OnInit {

  loggedInUser: any = {};
  pageTitle: BreadcrumbItem[] = [];

  constructor (private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.sharedUser.subscribe((data) => {
      next: {
        this.loggedInUser = data;
      }
    });
    this.pageTitle = [{ label: 'Apps', path: '/' }, { label: 'Social Feed', path: '/', active: true }];
  }



}
