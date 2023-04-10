import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authUrl = environment.API_URL + '/auth/';
  private userUrl = environment.API_URL + '/users/';
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(this.authUrl + 'login', data);
  }

  register(data: any) {
    return this.httpClient.post(this.authUrl + 'register', data);
  }

  profile(data: any) {
    return this.httpClient.get(this.userUrl + data.username, {
      headers: this.headers,
    });
  }

  follow(data: any) {
    return this.httpClient.post(this.userUrl + 'follow/' + data, {}, {
      headers: this.headers,
    });
  }

  unfollow(data: any) {
    return this.httpClient.post(this.userUrl + 'unfollow/' + data, {}, {  
      headers: this.headers,
    });
  }

  update(data: any) {
    return this.httpClient.put(this.userUrl, data, { headers: this.headers });
  }

  delete(data: any) {
    return this.httpClient.delete(
      this.userUrl + localStorage.getItem('userId'),
      {
        headers: this.headers,
      }
    );
  }
}
