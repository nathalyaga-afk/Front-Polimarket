import { Component, inject } from '@angular/core';
import { VentasApiService } from '../../../core/services/ventasapi.service';
import { Cliente } from '../../../models/cliente.interface';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-clientes',
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
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  
    private ventasApi = inject(VentasApiService);
  clientes: Cliente[] = [];
  cargando = false;
  error?: string;

  constructor() { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.error = undefined;

    this.ventasApi.getClientesPotenciales().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar clientes';
        this.cargando = false;
      }
    });
  }
}
