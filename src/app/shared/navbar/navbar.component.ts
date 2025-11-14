import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, PanelMenuModule, SidebarModule, ButtonModule, AvatarModule, RouterLink, RouterLinkActive],
  styles: [`
    .topbar { position: sticky; top:0; z-index:100; }
    .brand { text-decoration: none; font-weight: 700; }
  `],
  template: `
    <div class="topbar">
      <p-menubar [model]="topItems">
        <ng-template pTemplate="start">
          <button pButton type="button" icon="pi pi-bars" class="mr-2" (click)="sidebarVisible = true"></button>
          <a routerLink="/" class="brand text-lg text-color">PoliMarket</a>
        </ng-template>

     
      </p-menubar>
    </div>

    <p-sidebar [(visible)]="sidebarVisible" [modal]="true" styleClass="w-19rem">
      <h3 class="mt-0 mb-3">Menú</h3>
      <p-panelMenu [model]="sideItems()"></p-panelMenu>
    </p-sidebar>
  `
})
export class NavbarComponent {
  sidebarVisible = false;

  // Menú superior (links rápidos)
  topItems: MenuItem[] = [
   
  ];

  // Sidebar estructurado por RF (usa computed para actualizar según autorización)
  sideItems = computed<MenuItem[]>(() => {
    
    return [
      // RR. HH. — RF1
      {
        label: 'RR. HH.',
        icon: 'pi pi-id-card',
        items: [
          { label: 'Autorizar/Revocar Vendedores', icon: 'pi pi-user-check', routerLink: '/rrhh/autorizar-vendedores' }
        ]
      },

      // Ventas — RF2, RF3 (condicionado)
      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        // Si NO autorizado, se puede deshabilitar el grupo completo:
        items: [
          { label: 'Clientes Potenciales', icon: 'pi pi-users', routerLink: '/ventas/clientes' },
          { label: 'Productos Disponibles', icon: 'pi pi-tags', routerLink: '/ventas/productos' }
        ]
      },

      // Inventario — RF4
      {
        label: 'Inventario',
        icon: 'pi pi-database',
        items: [
          { label: 'Consulta de Stock', icon: 'pi pi-search', routerLink: '/inventario/consulta' }
        ]
      },

      // Proveedores — RF5
      {
        label: 'Proveedores',
        icon: 'pi pi-truck',
        items: [
          { label: 'Registrar Compras', icon: 'pi pi-plus-circle', routerLink: '/proveedores/compras' },
          { label: 'Proveedor Preferente', icon: 'pi pi-star', routerLink: '/proveedores/preferente' }
        ]
      },

      // Entregas — RF6
      {
        label: 'Entregas',
        icon: 'pi pi-send',
        items: [
          { label: 'Pedidos Confirmados', icon: 'pi pi-inbox', routerLink: '/entregas/pedidos-confirmados' },
          { label: 'Registrar Salida (Bodega)', icon: 'pi pi-external-link', routerLink: '/entregas/registrar-salida' }
        ]
      }
    ];
  });
}
