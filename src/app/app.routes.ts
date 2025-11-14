import { Routes } from '@angular/router';
import { AppShellComponent } from './shared/app-shell/app-shell.component';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
        ]
    },

    // Rutas protegidas (con Navbar y Sidebar)
    {
        path: '',
        children: [
            { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },

            // RRHH
            { path: 'rrhh/autorizar-vendedores', loadComponent: () => import('./features/rrhh/autorizar-vendedores/autorizar-vendedores.component').then(m => m.AutorizarVendedoresComponent) },

            // Ventas (protegidas)
            { path: 'ventas/clientes', loadComponent: () => import('./features/ventas/clientes/clientes.component').then(m => m.ClientesComponent) },
            { path: 'ventas/productos', loadComponent: () => import('./features/ventas/productos/productos.component').then(m => m.ProductosComponent) },

            // Inventario
            { path: 'inventario/consulta', loadComponent: () => import('./features/inventario/consulta-inventario/consulta-inventario.component').then(m => m.ConsultaInventarioComponent) },

            // Proveedores
            { path: 'proveedores/compras', loadComponent: () => import('./features/proveedores/registrar-compra/registrar-compra.component').then(m => m.RegistrarCompraComponent) },
            { path: 'proveedores/preferente', loadComponent: () => import('./features/proveedores/proveedor-preferente/proveedor-preferente.component').then(m => m.ProveedorPreferenteComponent) },

            // Entregas
            { path: 'entregas/pedidos-confirmados', loadComponent: () => import('./features/entregas/pedidos-confirmados/pedidos-confirmados.component').then(m => m.PedidosConfirmadosComponent) },
            { path: 'entregas/registrar-salida', loadComponent: () => import('./features/entregas/registrar-salida/registrar-salida.component').then(m => m.RegistrarSalidaComponent) },
        ]
    },

    // Redirección por defecto
    { path: '**', redirectTo: '' }
];