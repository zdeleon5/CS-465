import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Trip } from '../app/data/trips';
import { Observable } from 'rxjs';
import { User } from '../app/models/user';
import { AuthResponse } from '../app/models/auth-response';
import { BROWSER_STORAGE } from '../app/storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  url = 'http://localhost:3000/api';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  getTrip(code: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${code}`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData);
  }

  login(user: User, pswd: string) : Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, pswd);
  }

  register(user: User, pswd: string) : Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, pswd);
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string) :
    Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.url + '/' + endpoint, formData);
  }

}
