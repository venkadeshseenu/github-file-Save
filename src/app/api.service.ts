import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  username = 'venkadeshseenu';
  repo = 'github-file-Save';
  token = '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'; //replace your token later
 
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  
  //  https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
  getSha() {
    return this._http.get('https://api.github.com/repos/venkadeshseenu/github-file-Save/contents/test.yml', { headers: this.reqHeader });
  }
  save(body: any) {
    return this._http.put('https://api.github.com/repos/venkadeshseenu/github-file-Save/contents/test.yml', body, { headers: this.reqHeader })
  }
}  
