import { Component } from '@angular/core';
import { Apollo } from "apollo-angular";
import { GET_DEGREES, GET_NO_RESUME, GET_RESUMES, GET_TRAININGS } from 'src/graphql/approval';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})

export class ApprovalComponent {

  currentNavbar: string = '';
  selectedTable: string = '';
  currentuser: any;
  searchTraining: any;
  searchDegrees: any;
  searchResumes: any;
  resumeType: string = '';
  waitingDegrees: any;
  waitingTraining: any;
  waitingResume: any;

constructor(private apollo: Apollo){

}
  ngOnInit(): void {
    this.selectedTable = 'WAITING'
    this.getTraining();
    this.getDegrees();
    this.getResumes();
  }

  showNavbar(navbar: string, event: Event) {
    event.preventDefault();
    this.currentNavbar = navbar;
    this.selectedTable = '';  // Réinitialiser selectedTable lorsque vous changez la navbar
  }


    //GET degrees
    getDegrees(){
      this.apollo.query({
        query: GET_DEGREES,
        fetchPolicy:'network-only',
        variables: {
          type: 'DEGREE',
          status: 'WAITING'
        },
      }).subscribe(({data}:any) => {
        if(this.selectedTable === 'WAITING'){
          this.waitingDegrees = data.documents.totalCount
        }
      })
    }
  //GET TRAININGS
  getTraining() {
    this.apollo.query({
      query: GET_TRAININGS,
      fetchPolicy:'network-only',
      variables: {
        type: 'TRAINING',
        status: 'WAITING'
      },
    }).subscribe(({ data }:any) => {
      if(this.selectedTable === 'WAITING'){
        this.waitingTraining = data.documents.totalCount
      }
    });
  }
  //GET RESUMES
  getResumes(){
    this.resumeType = 'RESUME'
    this.apollo.query({
      query:GET_RESUMES,
      fetchPolicy:'network-only',
      variables:{
        status:'WAITING'
      },
    }).subscribe(({data}:any) => {
      if(this.selectedTable === 'WAITING'){
        this.waitingResume = data.resumes.totalCount
      }
    })
  }
  //GET NO RESUME
  getNoResume(event: { preventDefault: () => void; }){
    this.resumeType = 'NORESUME'
    event.preventDefault();
    this.apollo
    .query({
      query: GET_NO_RESUME,
    }).subscribe(({ data, loading }: any) => {
      let skippers = data.users.nodes.filter((skipper: { preferredConnection: string; }) => skipper.preferredConnection === "SAILOR");
      let noResumesSkippers:any = []
      skippers.forEach((element: { resumes: { totalCount: number; nodes: any[]; }; }) => {
        if(element.resumes.totalCount === 0){
          noResumesSkippers.push(element)
        }
        else{
          let verif = element.resumes.nodes.filter((ele:any) => ele.status !== "ACHIVED");
          if(verif.length === 0){
            noResumesSkippers.push(element)
          }
        }
      });
      this.searchResumes = JSON.stringify(noResumesSkippers);
    });
  }

}
