import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(
    private http: HttpClient,
  ) { }
  form(params: {}){
    return this.http.post(environment.baseUri + 'user/form', params, { headers: this.httpOptions});
  }
  getForm() {
    return this.http.get(environment.baseUri + 'user/getForm', { headers: this.httpOptions })
  }
}
