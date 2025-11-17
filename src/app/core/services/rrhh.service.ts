import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../../models/vendedor.interface';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {
  // Ajusta la URL base según tu backend real
  private readonly baseUrl = 'http://localhost:8082/api/rrhh/vendedores';

  constructor(private http: HttpClient) {}

  obtenerVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.baseUrl);
  }

  consultarEstado(idVendedor: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${idVendedor}/estado`);
  }

  autorizarVendedor(idVendedor: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${idVendedor}/autorizar`, {});
  }

  revocarVendedor(idVendedor: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${idVendedor}/revocar`, {});
  }
}
