export interface Producto {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  unidadMedida: string;
  estado: boolean;   // true = disponible
}
