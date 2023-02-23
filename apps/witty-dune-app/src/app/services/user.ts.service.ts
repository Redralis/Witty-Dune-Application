import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.API_URL + '/auth/';
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(this.url + 'login', data);
  }

  register(data: any) {
    return this.httpClient.post(this.url + 'register', data);
  }

  profile(data: any) {
    return this.httpClient.get(this.url + data.username, {
      headers: this.headers,
    });
  }

  update(data: any) {
    return this.httpClient.put(this.url, data, { headers: this.headers });
  }

  delete(data: any) {
    return this.httpClient.delete(this.url + localStorage.getItem('userId'), {
      headers: this.headers,
    });
  }
}
