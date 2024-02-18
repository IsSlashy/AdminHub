import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'src/app/admin/services/data-service.service';

@Component({
  selector: 'app-paiments',
  templateUrl: './paiments.component.html',
  styleUrls: ['./paiments.component.css'],
})
export class PaimentsComponent {
  jobs: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.dataService
        .clientPaiementById(param.get('id'))
        .subscribe(({ data }: any) => {
          this.jobs = data.user.jobsAsClientPaid.nodes;
          console.log('les paiments', this.jobs);
        });
    });
  }
}
