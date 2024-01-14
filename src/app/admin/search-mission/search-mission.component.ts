import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-search-mission',
  templateUrl: './search-mission.component.html',
  styleUrls: ['./search-mission.component.css']
})
export class SearchMissionComponent {

  jobs : Array<any> = new Array<any>();

  constructor(
    private apollo: Apollo
  ){}


  commercialChange(e: any,com: any,job: any){
    /* switch(com) {
      case 'com1':
        this.apollo.mutate({
          mutation: UPDATE_JOB,
          variables: {
            inputjob: {
              id: job.id,
              patch:{
                commercialSupport1:e.value,
              }
            }
          },
          refetchQueries: [
            {query: GET_JOBS}
          ],
        }).subscribe(({data}: any) => {
          console.log(data);
        });
      break
      case 'com2':
        this.apollo.mutate({
          mutation: UPDATE_JOB,
          variables: {
            inputjob: {
              id: job.id,
              patch:{
                commercialSupport2:e.value,
              }
            }
          },
          refetchQueries: [
            {query: GET_JOBS}
          ],
        }).subscribe(({data}: any) => {

        });
      break
      default:
    } */
  }

}
