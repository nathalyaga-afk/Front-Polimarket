import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../../models/vendedor.interface';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {
  // Backend de vendedores (según los cURL proporcionados)
  private readonly baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  obtenerVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.baseUrl}/vendedores`);
  }

  consultarEstado(idVendedor: number): Observable<{ estado: boolean }> {
    return this.http.get<{ estado: boolean }>(`${this.baseUrl}/vendedores/${idVendedor}/estado`);
  }

  autorizarVendedor(idVendedor: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/vendedores/${idVendedor}/estado`, { estado: true });
  }

  revocarVendedor(idVendedor: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/vendedores/${idVendedor}/estado`, { estado: false });
  }

  obtenerHistorial(idVendedor: number) {
    return this.http.get(`${this.baseUrl}/vendedores/${idVendedor}/historial`);
  }
}
