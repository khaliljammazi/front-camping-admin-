import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: Post[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  constructor(private sanitizer: DomSanitizer,
    private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'post', path: '/', active: true }];
    this._fetchData();
    this.initTableCofig();
  }
  /**
   * fetches table records
   */
  _fetchData(): void {
    this.postService.getPost().subscribe(
      {
        next: (posts: Post[]) => {
          this.records = posts;
        }
      });


  }

  /**
   * initialize advanced table columns
   */
  initTableCofig(): void {
    this.columns = [
      {
        name: 'title',
        label: 'title',
        formatter: (recp:Post) => recp.title,
        width: 80,
      },
      {
        name: 'image',
        label: 'image',
        formatter: this.CompImageFormatter.bind(this),
        width: 80,
      },

      {
        name: 'details',
        label: 'details',
        formatter: (recp:Post) => recp.details,
        width: 360,
      },
      {
        name: 'status',
        label: 'status',
        formatter: this.CompStatusFormatter.bind(this),
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

  onStatusChangeClicked(p: Post): void {
    
    p.active = !p.active;
    p.campingCenter= p.campingCenter;
    p.user= p.user;
            
    this.postService.updatePost(p).subscribe({
      next: () => {
        this._fetchData();
      },
      error: (err: any) => console.log(err)
    });
  }
 
  onViewClicked(p: any): void {
    this.router.navigate(['admin/post/view', p.id]);
  }
  onEditClicked(p: any): void {
    this.router.navigate(['admin/post/edit', p.id]);
  }

  
  // formats Comp status
 CompStatusFormatter(p:Post): any {
    if (p.active) {
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
  // formats Comp image
  CompImageFormatter(p:Post): any {
    if (p.image == null) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<img src="assets/images/users/user-3.jpg" alt="camping center image" class="img-fluid rounded">`
      );
    } else
    {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<img src="${p.image}" alt="camping center image" class="img-fluid rounded">`
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
  matches(row: Post, term: string) {
    return row.title.toLowerCase().includes(term)
      || row.details.toLowerCase().includes(term)
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
