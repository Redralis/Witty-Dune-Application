import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = environment.API_URL + "/posts";

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(this.url);
  }

  get(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  create(data: any) {
    return this.httpClient.post(this.url, data);
  }

  update(id: any, data: any) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  delete(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
