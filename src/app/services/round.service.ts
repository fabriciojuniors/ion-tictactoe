import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private http : HttpClient) { }

  public startSolo(dados):Observable<any>{
    return this.http.post(BASEURL+"/round", dados);
  }

  public update(dados):Observable<any>{
    return this.http.post(BASEURL+"/round", dados);
  }

  public getById(id):Observable<any>{
    return this.http.get(BASEURL+"/round/"+id);
  }
}
