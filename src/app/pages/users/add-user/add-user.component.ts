import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import * as filestack from "filestack-js";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { Select2Data } from "ng-select2-component";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  // Create a new instance of the Filestack client
  filestackClient = filestack.init("AImPrCDnyQeifHkYOX3sLz");
  pageTitle: BreadcrumbItem[] = [];
  user_form!: FormGroup;
  files: File[] = [];
  roles: Select2Data = [];
  gmapConfig2: any;
  test: any;

  selectedActivity: any[] = [];
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Users", path: "/" },
      { label: "Add user", path: "/", active: true },
    ];
    this.userService.getAllRoles().subscribe((roles) => {
      let data: Select2Data = roles.map((r) => {
        return {
          value: String(r.id),
          label: String(r.name),
          data: r,
        };
      });

      next: this.roles = data;
    });

    this.user_form = this.fb.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(4)]],
      active: [false, Validators.required],
      emailValide: [false, Validators.required],
      avatar: [""],
      roles: [[], Validators.required],
    });
  }

  get userFormControls() {
    return this.user_form.controls;
  }

  /**
   *  uploads files
   */

  onSelect(event: any) {
    this.files = event.addedFiles;
    // Upload the files using Filestack
    this.files.forEach((file) => {
      this.filestackClient
        .upload(file)
        .then((result) => {
          // Handle the successful upload
          this.user_form.patchValue({ avatar: result.url });
        })
        .catch((error) => {
          // Handle the upload error
          console.error("Filestack upload error:", error);
        });
    });
  }

  /**
   *   removes file from uploaded files
   */
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.userFormControls.avatar.setValue("");
  }

  /**
   * Formats the size
   */
  getSize(f: File) {
    const bytes = f.size;
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * Returns the preview url
   */
  getPreviewUrl(f: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      encodeURI(URL.createObjectURL(f))
    );
  }
  onSubmit(): void {
    this.user_form.patchValue({
      roles: this.roles.filter((u) =>
        (this.user_form.controls["roles"].value as String[]).includes(
          String(u.data.id)
        )
      ).map(u=> u.data),
    });
   
    console.log(this.user_form.value);
    !this.user_form.invalid &&
      this.userService.add(this.user_form.value).subscribe(
        (next) => {
          Swal.fire({
            title: "Success",
            text: "User added successfully!",
            icon: "success",
          });
          this.user_form.reset();
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        (error) => {
          console.error("There was an error!", this.user_form.value, error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while adding the user.",
            icon: "error",
          });
        }
      );
  }
}
