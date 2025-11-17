export interface Vendedor {
  idVendedor: number;
  idPersona: number;
  sueldo: number;
  estadoAutorizado: boolean;
  fechaAutorizacion?: string;
  fechaRevocacion?: string;
  // Campos opcionales (si el backend los expone en el futuro)
  nombreCompleto?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
}

export interface HistorialAutorizacion {
  idHistorial: number;
  idVendedor: number;
  estadoAnterior: boolean;
  estadoNuevo: boolean;
  fechaCambio: string;
  usuarioRRHH: string;
}
