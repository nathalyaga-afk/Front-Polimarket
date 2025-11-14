import { Component, inject } from '@angular/core';
import { VentasApiService } from '../../../core/services/ventasapi.service';
import { Producto } from '../../../models/producto.interface';

import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    TagModule,
    MessageModule,
    ProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
 // Usa inject() en lugar de constructor
  private ventasApi = inject(VentasApiService);
  productos: Producto[] = [];
  cargando = false;
  error?: string;

  constructor() { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(estado: string = 'DISPONIBLE'): void {
    this.cargando = true;
    this.error = undefined;

    this.ventasApi.getProductosDisponibles(estado).subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar productos';
        this.cargando = false;
      }
    });
  }
}
