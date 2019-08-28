import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { FIGIResult } from './class/FIGIResult';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'https://api.openfigi.com/v2';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-OPENFIGI-APIKEY' : '1a7fbf31-4d26-4708-9de1-0c5dcccb3480'
    })
  }  

  // HttpClient API get() method => Fetch environments list
  getSecurity(): Observable<FIGIResult> {
    const testreq =  {
       "idType" : "ID_WERTPAPIER",
       "idValue": "851399"
    }
    console.log('requesting')
    return this.http.post<FIGIResult>(this.apiURL + '/mapping', testreq)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}