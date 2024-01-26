import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CnicServiceService {
  constructor(private _http: HttpClient) {}

  addCnic(data: any): Observable<any> {
    return this._http.post('http://localhost:5033/api/Cnic', data);
  }

  getCnicList(): Observable<any> {
    return this._http.get('http://localhost:5033/api/Cnic');
  }

  deleteCnic(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5033/api/Cnic/${id}`);
  }

  updateCnic(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:5033/api/Cnic/${id}`, data);
  }
}
