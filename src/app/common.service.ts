import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly _url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  addNewUser(data: any, updated: boolean, id: any): Observable<any> {
    if (updated) {
      return this.http.put(this._url + 'users/' + id, data);
    }
    return this.http.post(this._url + 'users', data);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this._url + 'users');
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(this._url + 'users/' + id);
  }

  deleteUserById(id: any): Observable<any> {
    return this.http.delete(this._url + 'users/' + id);
  }
}
