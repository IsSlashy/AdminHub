import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AquaplotService {
  constructor(private http: HttpClient) {}

  public getLocations(): Observable<any> {
    return this.http.get<any>('https://api.aquaplot.com/v1/locations');
  }

  public getRoute(
    from: { lat: number; lng: number },
    to: { lat: number; lng: number }
  ): Observable<any> {
    const authorizationHeader =
      'Basic ' + btoa('KiCrTxUBxQAYPMJb:xVBznDhDwtytDpZr');
    const headers = new HttpHeaders({
      Authorization: authorizationHeader,
    });
    return this.http.get<any>(
      'https://api.aquaplot.com/v1/route/from/' +
        from.lng +
        '/' +
        from.lat +
        '/to/' +
        to.lng +
        '/' +
        to.lat,
      { headers: headers }
    );
  }

  private getSingleValidation(lat: number, lng: number): Observable<any> {
    return this.http.get<any>(
      'https://api.aquaplot.com/v1/validate/' + lng + '/' + lat
    );
  }

  private postMultipleValidation(body: string): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://api.aquaplot.com/v1/validate',
      body,
      header
    );
  }

  /*     public isLocationValid(loc: { lat: number, lng: number }): boolean {
        const validityReport = new ValidationReport();

        const validityObserver = {
            next: data => {
                validityReport.update(data);
            },
            error: error => console.log('Location Validation got an error:', error),
        };

        this.getSingleValidation(loc.lat, loc.lng).subscribe(validityObserver);

        return validityReport.getIsValid();
    } */

  // THESE FUNCTIONS ARE ONLY TO BE USED IF PROCESSING A NEW DATABASE

  /*     public harbourDatabaseParser() {
        const locations = this.getAllLocations();
        const harbourReports = this.limitedMultipleValidation(locations, 100);

        setTimeout(() => {
        }, 120000);

    } */

  private getAllLocations(): Array<{ lat: number; lng: number }> {
    const locations = new Array<{ lat: number; lng: number }>();
    // when using, change locations for json file
    locations.forEach((element) => {
      locations.push({ lat: element.lat, lng: element.lng });
    });
    return locations;
  }

  /*     private limitedMultipleValidation(locations: Array<any>, limit: number): Array<ValidationReport> {
        const maxCounter = locations.length;
        let iterations = 1;

        const validityReports = new Array<ValidationReport>();
        const validityObserver = {
            next: data => {
                const dataArray = data;
                dataArray.forEach(elt => {
                  const validityReport = new ValidationReport();
                  validityReport.update(elt);
                  validityReports.push(validityReport);
                });
            },
            error: error => console.log('Location Validation got an error:', error)
        };

        for (let globalCounter = 0; globalCounter <= maxCounter; globalCounter += limit) {
            const limitedList = locations.slice(globalCounter, limit * iterations);
            const requestBody = JSON.stringify({ requests: limitedList});
            //  get response from multiple validation
            this.postMultipleValidation(requestBody).subscribe(validityObserver);
            //  append response to extensive harbour json
            ++iterations;
        }

        return validityReports;
    } */
}
