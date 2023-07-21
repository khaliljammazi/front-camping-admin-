import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as filestack from 'filestack-js';
import { Activity } from 'src/app/models/Activity';
import { CampingCenter } from 'src/app/models/CampingCenter';
import { ActivitiesService } from 'src/app/services/activities.service';
import { CampCenterService } from 'src/app/services/camp-center.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
  pageTitle: BreadcrumbItem[] = [];
   newActivity!: FormGroup;
   files: File[] = [];
   seasons: string[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
   campingCenters: CampingCenter[] = [];   
   loader = false;

  constructor( private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private activityService: ActivitiesService,
    private campCenterService: CampCenterService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Activitis', path: '/' }, { label: 'Add Activity', path: '/', active: true }];

 // product form
 this.newActivity = this.fb.group({ 
  label: ['', Validators.required],
  discount: ['', Validators.required],
  description: ['', Validators.required],
  price: ['', Validators.required],
  season: ['', Validators.required],
  image: ['', Validators.required],
  duration: ['', Validators.required],
  capacity: ['', Validators.required],
  campingCenterId: ['', Validators.required]


 
});
this.campCenterService.getCamps().subscribe(
  {
    next: (camp: CampingCenter[]) => {
      this.campingCenters = camp;
    }
  }
);



}
get form1() { return this.newActivity.controls; }


onSelect(event: any) {
  this.files.push(...event.addedFiles);
  this.loader = true;
    // Upload the files using Filestack
    this.files.forEach((file) => {
      this.filestackClient.upload(file)
        .then((result) => {
          this.loader = false;
          // Handle the successful upload
          console.log('Filestack upload result:', result);
          this.newActivity.patchValue({ image: result.url });

        })
        .catch((error) => {
          this.loader = false;
          // Handle the upload error
          console.error('Filestack upload error:', error);
        });
    });
  }

  trackByItemID(index: number, a:any): number { return a.id; }


  /**
   *   removes file from uploaded files
   */
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  /**
  * Formats the size
  */
  getSize(f: File) {
    const bytes = f.size;
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  /**
   * Returns the preview url
   */


onSubmit(): void {
 
  this.activityService.addActivity(this.newActivity.value, this.newActivity.value.campingCenterId).subscribe(
    
 next => {
      Swal.fire({
        title: 'Success',
        text: 'Activity added successfully!',
        icon: 'success',
      });
      this.newActivity.reset();
      this.router.navigate(['../'], {relativeTo: this.route});
    },
    error => {
      console.error('There was an error!', this.newActivity.value, error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while adding the activity.',
        icon: 'error',
      });
    }
  );
}



  /**
   *   removes file from uploaded files
   */
 

  /**
  * Formats the size
  */
 


  /**
   * Returns the preview url
   */
  getPreviewUrl(f: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(f)));
  }



  

}
