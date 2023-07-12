import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { DomSanitizer } from '@angular/platform-browser';
import * as filestack from 'filestack-js';
import { CampCenterService } from 'src/app/services/camp-center.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; 



@Component({
  selector: 'app-add-camping-center',
  templateUrl: './add-camping-center.component.html',
  styleUrls: ['./add-camping-center.component.scss']
})


export class AddCampingCenterComponent implements OnInit {
  
// Create a new instance of the Filestack client
 filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
 pageTitle: BreadcrumbItem[] = [];
  newCamp!: FormGroup;
  files: File[] = [];
  activity: Select2Data = [];
  gmapConfig2: any;
  test: any;

  selectedActivity: any[] = [];
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private CampCenterService: CampCenterService,
    private router: Router,


  ) { }
  

  ngOnInit(): void {

    this.pageTitle = [{ label: 'Camp-Center', path: '/' }, { label: 'Add Camp', path: '/', active: true }];

 // product form
 this.newCamp = this.fb.group({ 
  label: ['', Validators.required],
  location: ['', Validators.required],
  discount: ['', Validators.required],
  description: ['', Validators.required],
  price: ['', Validators.required],
  active: ['', Validators.required],
  image: ['', Validators.required],
  telephone: ['', Validators.required],
 /*  activities: [this.selectedActivity, Validators.required], */

  

 
});
this.gmapConfig2 = {
  lat: 33.8869,
  lng: 9.5375,
  markers: [
    { lat: 33.8869, lng: 9.5375, title : 'your camping center' ,draggable: true }

  ]
};




}

markerDragEnd(event: any, marker: any): void {
  const updatedLat = event.latLng.lat();
  const updatedLng = event.latLng.lng();
  marker.lat = updatedLat;
  marker.lng = updatedLng;
  console.log('new', event, marker);
  this.newCamp.patchValue({ location:  `${updatedLat},${updatedLng}`  });
  
 

}
  // convenience getter for easy access to form fields
  get form1() { return this.newCamp.controls; }

  /**
   *  adds new file in uploaded files
   */

    onSelect(event: any) {
      this.files.push(...event.addedFiles);
        // Upload the files using Filestack
        this.files.forEach((file) => {
          this.filestackClient.upload(file)
            .then((result) => {
              // Handle the successful upload
              console.log('Filestack upload result:', result);
              this.newCamp.patchValue({ image: result.url });

            })
            .catch((error) => {
              // Handle the upload error
              console.error('Filestack upload error:', error);
            });
        });
      }
    
  /**
   * add new members in selected members
   * @param event member data
   */
  AddActivity(event: any): void {
     const isAlreadySelected = this.selectedActivity.filter((item: any) => item.id === event.options[0].value.id);
    if (isAlreadySelected && isAlreadySelected.length === 0) {
      this.selectedActivity.push(event.options[0].value);
      event.options[0].disabled = true;

    } else {
      this.selectedActivity.splice(this.selectedActivity.indexOf(event.options[0].value), 1);
      event.options[0].disabled = false;

    }
  }
  removeActivity(index: number): void {
    this.selectedActivity.splice(index, 1);
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
  getPreviewUrl(f: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(f)));
  }
  onSubmit(): void {
 
    this.CampCenterService.addCamp(this.newCamp.value).subscribe(
      
   next => {
        Swal.fire({
          title: 'Success',
          text: 'Camp added successfully!',
          icon: 'success',
        });
        this.newCamp.reset();
        this.router.navigate(['/camping-center']);
      },
      error => {
        console.error('There was an error!', this.newCamp.value, error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding the camp.',
          icon: 'error',
        });
      }
    );
  }

}
