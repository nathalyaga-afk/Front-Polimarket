// src/app/models/inventario.interface.ts
export interface Inventario {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  unidadMedida: string;
  stockDisponible: number;
  estadoProducto: boolean;
  stockActual: number;
  stockReservado: number;
  stockMinimo: number;
  fechaActualizacion: string;
}
