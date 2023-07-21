import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import * as filestack from "filestack-js";
import { Select2Data, Select2Value } from "ng-select2-component";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.scss"],
})
export class UpdateUserComponent implements OnInit {
  // Create a new instance of the Filestack client
  filestackClient = filestack.init("AImPrCDnyQeifHkYOX3sLz");
  pageTitle: BreadcrumbItem[] = [];
  user_form!: FormGroup;
  files: File[] = [];
  roles: Select2Data = [];
  already_selected: Select2Value = [];
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
      { label: "Update user", path: "/", active: true },
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

    this.userService.getById(this.route.snapshot.params.id).subscribe({
      next: (data: User) => {
        this.user_form.patchValue(data);
        this.user_form.patchValue({
          roles: data.roles.map((r) => {
            return {
              value: String(r.id),
              label: String(r.name),
              data: r,
            };
          }),
        });
        this.already_selected = data.roles.map((r) => {
          return String(r.id);
        });
        console.log(this.already_selected);
      },
    });

    this.user_form = this.fb.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
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
      roles: this.roles
        .filter((u) =>
          (this.user_form.controls["roles"].value as String[]).includes(
            String(u.data.id)
          )
        )
        .map((u) => u.data),
    });

    console.log(this.user_form.value);
    !this.user_form.invalid &&
      this.userService
        .update(this.user_form.value, this.route.snapshot.params.id)
        .subscribe(
          (next) => {
            Swal.fire({
              title: "Success",
              text: "User added successfully!",
              icon: "success",
            });
            this.user_form.reset();
            this.router.navigate(["../../"], { relativeTo: this.route });
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
