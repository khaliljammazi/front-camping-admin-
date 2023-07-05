import { Component, OnInit,ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { Fancybox } from '@fancyapps/ui';
import { CampingCenter } from 'src/app/models/CampingCenter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carouselOptions: OwlOptions = {
    loop: true,
      margin: 0,
      nav: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: true,
      autoplayTimeout: 6000,
      navText: ['<span class="far fa-arrow-left"></span>', '<span class="far-angle-right"></span>'],

    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      800: {
        items: 1
      },
      1024: {
        items: 1
      }
    },
   
  }
  carouselOptions1 = {
    loop: true,
    margin: 30,
    nav: true,
    smartSpeed: 500,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: ['<span class="far fa-angle-left"></span>', '<span class="far fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      600: {
        items: 2
      },
      1800: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  };
  slidesStore = [
    {
      id: 'slide1',
      image: 'assets/images/banner/banner-1.jpg',
      caption: 'Join the Summer Adventure',
      heading: 'Camping With Friends Gives Joy',
      link: 'index.html',
      buttonText: 'Discover More'
    },
    {
      id: 'slide2',
      image: 'assets/images/banner/banner-2.jpg',
      caption: 'Join the Summer Adventure',
      heading: 'Camping With Friends Gives Joy',
      link: 'index.html',
      buttonText: 'Discover More'
    }
  ];
  camps: any[] = [];

  constructor(
    private campService: CampCenterService,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });
    this.campService.getCamps().subscribe((c) => {
      this.camps = c.filter((camp)=>camp.active).map((camp) => {
        return {
          id: camp.id,
          imageSrc: camp.image,
          imageAlt: camp.label,
          title: camp.label,
          link: 'camping-details/' + camp.id
        }
      })



    })
  }
  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

}
