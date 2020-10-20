import { Injectable } from '@angular/core';


import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

/*
  getLeaders(): Leader[] {
    return LEADERS;
  
  }

  getLeader(id : string):Leader {
    return  LEADERS.filter((leader) => (leader.id===id ))[0];    
  }

  getFeaturedLeader():Leader{
    return LEADERS.filter((leader) => (leader.featured) ) [0];
  }
  */
 /*
 getLeaders(): Promise< Leader[]> {
  return new Promise (resolve =>{
    setTimeout(()=>resolve(LEADERS),2000);
  }) 

}

getLeader(id : string):Promise<Leader> {
  return new  Promise(resolve=> {
   setTimeout(() => (LEADERS.filter((leader) => (leader.id===id ))[0]),2000);
    
}
)
}

getFeaturedLeader(): Promise<Leader> {
  return  new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
  });
}

*/
/*
getLeaders(): Observable<Leader[]> {
  return of(LEADERS).pipe(delay(2000));
}

getLeader(id: string): Observable<Leader> {
  return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
}

getFeaturedLeader(): Observable<Leader> {
  return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
}
*/
getLeaders(): Observable<Leader[]> {
  return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeader(id: number): Observable<Leader> {
  return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getFeaturedLeader(): Observable<Leader> {
  return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
}


}

