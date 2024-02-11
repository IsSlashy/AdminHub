import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ALL_NOTATIONS } from 'src/graphql/notations';

@Component({
  selector: 'app-notations',
  templateUrl: './notations.component.html',
  styleUrls: ['./notations.component.css'],
})
export class NotationsComponent {
  paramForm: FormGroup = this.formBuilder.group({
    jobId: [null, []],
    userId: [null, []],
  });

  notations: Array<any> = new Array<any>();
  dataSource!: MatTableDataSource<any>;
  pageIndex: number = 0;
  displayedColumns: string[] = [
    'marin',
    'client',
    'job',
    'note',
    'commentaire',
  ];
  set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.paramForm.patchValue({
        jobId: params.get('jobId'),
        userId: params.get('userId'),
      });
      this.apollo
        .watchQuery({
          query: ALL_NOTATIONS,
          variables: {},
        })
        .valueChanges.subscribe(({ data }: any) => {
          this.notations = data.notations.nodes;
          this.dataSource = new MatTableDataSource(this.notations);

          console.log('les data', data);
        });
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.pageIndex = event.pageIndex;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.notations.slice(startIndex, endIndex);
  }
}
