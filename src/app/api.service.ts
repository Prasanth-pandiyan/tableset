import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  public api_base_url = 'https://api.github.com/search/issues';

  constructor(private httpClient: HttpClient) { }

  public getdata(query,sort,order,pagination) {
    return this.httpClient.get(`${this.api_base_url}?q=${query}&sort=${sort}&order=${order}&page=${pagination}`);
  }

}
