import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlldataserviceService {

  constructor(private httpClient: HttpClient) { }

  public apiGet(api){
    return this.httpClient.get(api);
  }
}
