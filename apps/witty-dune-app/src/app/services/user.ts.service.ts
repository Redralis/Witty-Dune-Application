import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(this.url + "/auth/login", data);
  }

  register(data: any) {
    return this.httpClient.post(this.url + "/auth/register", data);
  }
}
