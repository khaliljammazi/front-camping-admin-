import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: User[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];


  constructor(
  private userService: UserService,
  private sanitizer: DomSanitizer,
  private router: Router
  )
   { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'users', path: '/', active: true }];
    this._fetchData();
    this.initTableConfig();
  }
   /**
   * fetches table records
   */
   _fetchData(): void {
    this.userService.getAll().subscribe(
      {
        next: (users: User[]) => {
          users.map(u => delete u.authorities);
          this.records = users;
        },
        error: (err: any) => console.log(err)

      });

  }

  /**
   * initialize advanced table columns
   */
  initTableConfig(): void {
    this.columns = [
      {
        name: 'Nom et prenom',
        label: 'Nom et prenom',
        formatter: (record: User) => String(record.nom) +" "+ String(record.prenom),
        width: 80,
      },
      {
        name: 'Image',
        label: 'Image',
        formatter: this.userAvatarFormatter.bind(this),
        width: 80,
      },

      {
        name: 'Email',
        label: 'Email',
        formatter: (record: User) => record.email,
        width: 360,
      },
      {
        name: 'Valid email',
        label: 'Valid email',
        formatter: this.emailStatusFormatter.bind(this),
        width: 40
      },
      {
        name: 'Status',
        label: 'Status',
        formatter: this.userStatusFormatter.bind(this),
        width: 180,
      },
      {
        name: 'actions',
        label: 'actions',
        formatter: ()=>{},
        width: 5
      },

    ];
  }

  onStatusChangeClicked(user: User): void {    
    user.active = !user.active;
    console.log(user);
    
    this.userService.update(user,user.id).subscribe({
      next: () => {
        this._fetchData();
      },
      error: (err: any) => console.log(err)
    });
  }
 
  onViewClicked(user: any): void {
    this.router.navigate(['/admin/users/view', user.id]);
  }
  onEditClicked(user: any): void {
    this.router.navigate(['/admin/users/update', user.id]);
  }

  
  // formats user status
 userStatusFormatter(user:User): any {
    if (user.active) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span class="btn btn-soft-success rounded-pill waves-effect waves-light">Active</span>`
      );
    }
    else {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span class="btn btn-soft-danger rounded-pill waves-effect waves-light">Disable</span>`
      );
    }
  }
    // formats user status
 emailStatusFormatter(user:User): any {
  if (user.emailValide) {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<span class="btn btn-soft-success rounded-pill waves-light ">Validated</span>`
    );
  }
  else {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<span class="btn btn-danger rounded-pill waves-light ">Invalid</span>`
    );
  }
}
  // formats user image
  userAvatarFormatter(user:User): any {
    if (user.avatar == null) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<img src="assets/images/users/user-3.jpg" alt="camping center image" class="img-fluid rounded">`
      );
    } else
    {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<img src="${user.avatar}" alt="camping center image" class="img-fluid rounded">`
    );
    }
  }


/**
 * Compare two cell values
 * @param v1 Value 1
 * @param v2 Value 2
 * @returns Comparison result
 */
compare(v1: string | number, v2: string | number): any {
  if (typeof v1 === 'string' && typeof v2 === 'string') {
    return v1.localeCompare(v2);
  } else {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
}
/**
 * Get the property value of an object dynamically using a string key
 * @param obj The object
 * @param key The property key
 * @returns The property value
 */
getPropertyValue(obj: any, key: string): any {
  return obj[key];
}

  /**
   * Sort the table data
   * @param event column name, sort direction
   */
  onSort(event: SortEvent): void {
    if (event.direction === '') {
      this.records = [...this.records];
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(this.getPropertyValue(a, event.column), this.getPropertyValue(b, event.column));
        return event.direction === 'asc' ? res : -res;
      });
    }
  }

  /**
 * Match table data with search input
 * @param row Table row
 * @param term Search the value
 */
  matches(row: User, term: string) {
    return String(row.nom).toLowerCase().includes(term)
      || String(row.prenom).toLowerCase().includes(term)
      || String(row.email).includes(term)
      || String(row.active).includes(term)
      || String(row.emailValide).includes(term);
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = [...this.records];

      //  filter
      updatedData = updatedData.filter(record => this.matches(record, searchTerm));
      this.records = updatedData;
    }

  }
  

}
