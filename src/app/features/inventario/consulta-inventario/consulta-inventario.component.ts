import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { VentasApiService } from '../../../core/services/ventasapi.service';
import { Inventario } from '../../../models/inventario.interface';

type FiltroEstado = 'TODOS' | 'DISPONIBLES' | 'NO_DISPONIBLES';

@Component({
  selector: 'app-consulta-inventario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    TagModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  templateUrl: './consulta-inventario.component.html',
  styleUrl: './consulta-inventario.component.scss'
})
export class ConsultaInventarioComponent {

  private ventasApi = inject(VentasApiService);

  inventario: Inventario[] = [];
  cargando = false;
  error?: string;

  filtroEstado: FiltroEstado = 'TODOS';

  estadoOptions = [
    { label: 'Todos', value: 'TODOS' as FiltroEstado },
    { label: 'Disponibles', value: 'DISPONIBLES' as FiltroEstado },
    { label: 'No disponibles', value: 'NO_DISPONIBLES' as FiltroEstado }
  ];

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.cargando = true;
    this.error = undefined;

    this.ventasApi.getInventario().subscribe({
      next: (data) => {
        this.inventario = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar inventario';
        this.cargando = false;
      }
    });
  }

  // Lista que realmente se muestra en la tabla según el filtro
  get inventarioFiltrado(): Inventario[] {
    if (this.filtroEstado === 'DISPONIBLES') {
      return this.inventario.filter(p => p.estadoProducto === true);
    }
    if (this.filtroEstado === 'NO_DISPONIBLES') {
      return this.inventario.filter(p => p.estadoProducto === false);
    }
    return this.inventario;
  }
}
