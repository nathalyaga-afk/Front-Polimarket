import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente.interface';
import { Producto } from '../../models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasApiService {

  // ajusta si usas otro puerto o contexto
  private readonly baseUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  getProductosDisponibles(estado?: string): Observable<Producto[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }

    return this.http.get<Producto[]>(`${this.baseUrl}/productos-disponibles`, { params });
  }

  getClientesPotenciales(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes-potenciales`);
  }
}
