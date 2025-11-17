export interface Vendedor {
  idVendedor: number;
  idPersona: number;
  nombreCompleto: string;
  tipoDocumento: string;
  numeroDocumento: string;
  salario: number;
  autorizado: boolean;
  fechaAutorizacion?: string;
  fechaRevocada?: string;
}

export interface HistorialAutorizacion {
  idHistorial: number;
  idVendedor: number;
  estadoAnterior: boolean;
  estadoNuevo: boolean;
  fechaCambio: string;
  usuarioRRHH: string;
}
