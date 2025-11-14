import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  fullName: string;
  roles: string[];         // p.ej. ['VENDEDOR'], ['RRHH']
  authorizedVendor?: boolean; // RF2: sólo si true puede entrar a Ventas
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // "BD" simulada
  private mockUsers: User[] = [
    { id: 1, username: 'rrhh',     fullName: 'Recursos Humanos', roles: ['RRHH'], authorizedVendor: false, token: 't-rrhh' },
    { id: 2, username: 'vendedor', fullName: 'Vendedor Autorizado', roles: ['VENDEDOR'], authorizedVendor: true,  token: 't-vend-ok' },
    { id: 3, username: 'novend',   fullName: 'Vendedor No Autorizado', roles: ['VENDEDOR'], authorizedVendor: false, token: 't-vend-no' }
  ];

  private _currentUser = signal<User | null>(null);
  currentUser = computed(() => this._currentUser());

  constructor() {
    // Restaurar sesión desde storage (simulado)
    const raw = localStorage.getItem('auth_user');
    if (raw) {
      try { this._currentUser.set(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }

  signIn(username: string, password: string): Observable<User> {
    // password no se valida en el mock; sólo username
    const u = this.mockUsers.find(x => x.username === username);
    if (!u) return throwError(() => new Error('Usuario o contraseña inválidos'));

    // Simula latencia
    return of(structuredClone(u)).pipe(
      delay(600),
      tap(user => {
        this._currentUser.set(user);
        localStorage.setItem('auth_user', JSON.stringify(user));
      })
    );
  }

  signOut(): void {
    this._currentUser.set(null);
    localStorage.removeItem('auth_user');
  }

  isLoggedIn(): boolean {
    return !!this._currentUser();
  }
}
