import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { RrhhService } from '../../../core/services/rrhh.service';
import { Vendedor } from '../../../models/vendedor.interface';

@Component({
  selector: 'app-autorizar-vendedores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    TagModule,
    ProgressSpinnerModule,
    TableModule
  ],
  templateUrl: './autorizar-vendedores.component.html',
  styleUrl: './autorizar-vendedores.component.scss'
})
export class AutorizarVendedoresComponent {
  private rrhhService = inject(RrhhService);

  vendedores: Vendedor[] = [];
  idBusqueda?: number;
  estadoActual?: boolean;

  cargando = false;
  mensaje?: string;
  error?: string;

  ngOnInit(): void {
    this.cargarVendedores();
  }

  cargarVendedores(): void {
    this.cargando = true;
    this.error = undefined;

    this.rrhhService.obtenerVendedores().subscribe({
      next: (data) => {
        this.vendedores = [...data].sort((a, b) => a.idVendedor - b.idVendedor);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los vendedores.';
        this.cargando = false;
      }
    });
  }

  consultarEstado(): void {
    if (!this.idBusqueda && this.idBusqueda !== 0) {
      this.error = 'Ingresa un ID de vendedor.';
      return;
    }
    this.resetMensajes();
    this.cargando = true;

    this.rrhhService.consultarEstado(this.idBusqueda!).subscribe({
      next: (resp) => {
        this.estadoActual = resp.estado;
        this.mensaje = `El vendedor ${this.idBusqueda} está ${resp.estado ? 'AUTORIZADO' : 'NO AUTORIZADO'}.`;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo consultar el estado del vendedor.';
        this.cargando = false;
      }
    });
  }

  autorizar(): void {
    if (!this.idBusqueda && this.idBusqueda !== 0) {
      this.error = 'Ingresa un ID de vendedor.';
      return;
    }
    this.accionEstado('autorizar');
  }

  revocar(): void {
    if (!this.idBusqueda && this.idBusqueda !== 0) {
      this.error = 'Ingresa un ID de vendedor.';
      return;
    }
    this.accionEstado('revocar');
  }

  private accionEstado(tipo: 'autorizar' | 'revocar'): void {
    this.resetMensajes();
    this.cargando = true;

    const accion$ = tipo === 'autorizar'
      ? this.rrhhService.autorizarVendedor(this.idBusqueda!)
      : this.rrhhService.revocarVendedor(this.idBusqueda!);

    accion$.subscribe({
      next: () => {
        this.mensaje = `Vendedor ${this.idBusqueda} ${tipo === 'autorizar' ? 'AUTORIZADO' : 'REVOCADO'} correctamente.`;
        this.estadoActual = tipo === 'autorizar';
        this.cargando = false;
        this.cargarVendedores();
      },
      error: () => {
        this.error = `No se pudo ${tipo} el vendedor.`;
        this.cargando = false;
      }
    });
  }

  private resetMensajes(): void {
    this.mensaje = undefined;
    this.error = undefined;
  }
}
