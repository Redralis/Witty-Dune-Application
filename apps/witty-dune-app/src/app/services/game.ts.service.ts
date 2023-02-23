import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = environment.API_URL + '/games';
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(this.url);
  }

  get(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  create(data: any) {
    return this.httpClient.post(this.url, data, { headers: this.headers });
  }

  update(id: any, data: any) {
    return this.httpClient.put(`${this.url}/${id}`, data, {
      headers: this.headers,
    });
  }

  delete(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`, {
      headers: this.headers,
    });
  }
}
